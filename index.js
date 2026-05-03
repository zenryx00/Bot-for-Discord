const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// 📦 config
const config = require('./Data/config.json');

// 🌐 base path global
global.basePath = __dirname;

// 🧠 UTILS
global.utils = {};

function loadUtils() {
    try {
        global.utils.warns = require(path.join(__dirname, 'utils/warns'));
        console.log('✅ warns cargado');
    } catch (e) {
        console.log('❌ warns no cargó:', e.message);
    }

    try {
        global.utils.bans = require(path.join(__dirname, 'utils/bans'));
        console.log('✅ bans cargado');
    } catch (e) {
        console.log('❌ bans no cargó:', e.message);
    }
}

// 🤖 CLIENT
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
});

// 📦 comandos
client.commands = new Collection();

// =======================
// 📁 PATHS
// =======================
const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

// =======================
// 📦 LOAD COMMANDS
// =======================
function loadCommands(dir) {

    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {

        const fullPath = path.join(dir, file);

        try {
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                loadCommands(fullPath);
                continue;
            }

            if (!file.endsWith('.js')) continue;

            delete require.cache[require.resolve(fullPath)];

            const command = require(fullPath);

            if (!command || !command.name || !command.execute) continue;

            client.commands.set(command.name, command);

            console.log(`✅ CMD: ${command.name}`);

        } catch (err) {
            console.log(`❌ ERROR CMD ${file}`, err.message);
        }
    }
}

// =======================
// ⚡ LOAD EVENTS
// =======================
function loadEvents(dir) {

    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

    for (const file of files) {

        const fullPath = path.join(dir, file);

        try {
            delete require.cache[require.resolve(fullPath)];

            const event = require(fullPath);

            if (typeof event !== 'function') continue;

            event(client);

            console.log(`⚡ EVT: ${file}`);

        } catch (err) {
            console.log(`❌ ERROR EVT ${file}`, err.message);
        }
    }
}

// =======================
// 🚀 DEPLOY SLASH COMMANDS
// =======================
const deployCommands = require('./deploy-commands');

// =======================
// 🤖 READY
// =======================
client.once('ready', async () => {

    console.log(`🤖 Bot listo como ${client.user.tag}`);
    console.log(`📌 Prefix: ${config.prefix}`);

    loadUtils();
    loadCommands(commandsPath);
    loadEvents(eventsPath);

    console.log(`📦 CMD cargados: ${client.commands.size}`);

    // 🚀 SLASH DEPLOY
    try {
        await deployCommands();
        console.log('📡 Slash commands sincronizados');
    } catch (err) {
        console.log('❌ Error deploy:', err.message);
    }
});

// =======================
// 💬 PREFIX HANDLER
// =======================
client.on('messageCreate', async message => {

    if (message.author.bot || !message.guild) return;

    const prefix = config.prefix;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    const start = Date.now();

    try {

        await Promise.race([
            command.execute(message, args),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 8000)
            )
        ]);

        const ms = Date.now() - start;

        if (ms > 2000) {
            console.log(`⚠️ Lento: ${commandName} (${ms}ms)`);
        }

    } catch (err) {
        console.log(`❌ Error ${commandName}:`, err.message);

        try {
            await message.reply('❌ Error ejecutando comando');
        } catch {}
    }
});

// =======================
// ⚡ SLASH HANDLER
// =======================
client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return interaction.reply({
            content: '❌ Comando no encontrado',
            ephemeral: true
        });
    }

    try {
        await command.execute(interaction, client);
    } catch (err) {
        console.log('❌ Slash error:', err.message);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: '❌ Error ejecutando comando',
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: '❌ Error ejecutando comando',
                ephemeral: true
            });
        }
    }
});

// =======================
// 🛡️ ANTI CRASH
// =======================
process.on('unhandledRejection', err => {
    console.log('⚠️ Unhandled Rejection:', err);
});

process.on('uncaughtException', err => {
    console.log('⚠️ Uncaught Exception:', err);
});

// =======================
// 🚀 LOGIN
// =======================
client.login(process.env.TOKEN);