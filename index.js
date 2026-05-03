const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// 📦 config
const config = require('./Data/config.json');

// 🌐 base path global
global.basePath = __dirname;

// 🧠 INIT UTILS SEGURAS
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

// 🤖 client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
});

// 📦 comandos
client.commands = new Collection();

// 📁 paths
const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

// =======================
// 📦 LOAD COMMANDS
// =======================
function loadCommands(dir) {

    if (!fs.existsSync(dir)) {
        console.log(`❌ Carpeta no encontrada: ${dir}`);
        return;
    }

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

            if (!command || !command.name || !command.execute) {
                console.log(`❌ Comando inválido: ${file}`);
                continue;
            }

            client.commands.set(command.name, command);

            console.log(`✅ Cargado: ${command.name}`);

        } catch (err) {
            console.log(`❌ ERROR en ${file}`);
            console.log(err);
        }
    }
}

// =======================
// ⚡ LOAD EVENTS (AQUÍ VA LA IA)
// =======================
function loadEvents(dir) {

    if (!fs.existsSync(dir)) {
        console.log(`⚠️ No hay carpeta de eventos`);
        return;
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

    for (const file of files) {

        const fullPath = path.join(dir, file);

        try {
            delete require.cache[require.resolve(fullPath)];

            const event = require(fullPath);

            if (typeof event !== 'function') {
                console.log(`❌ Evento inválido: ${file}`);
                continue;
            }

            event(client); // 👈 aquí se ejecuta messageCreate de IA

            console.log(`⚡ Evento cargado: ${file}`);

        } catch (err) {
            console.log(`❌ ERROR en evento ${file}`);
            console.log(err);
        }
    }
}

// =======================
// 🚀 READY
// =======================
client.once('ready', () => {

    console.log(`👤 Bot activo como ${client.user.tag}`);
    console.log(`📌 Prefijo: ${config.prefix}`);

    loadUtils();
    loadCommands(commandsPath);
    loadEvents(eventsPath); // 👈 IMPORTANTE

    console.log(`📦 Comandos cargados: ${client.commands.size}`);
});

// =======================
// 💬 HANDLER PREFIX (NO SE TOCA)
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
        console.log(`❌ Error en ${commandName}:`, err.message);

        try {
            await message.reply('❌ Error ejecutando comando');
        } catch {}
    }
});

// 🛡️ ANTI CRASH
process.on('unhandledRejection', err => {
    console.log('⚠️ Unhandled Rejection:', err);
});

process.on('uncaughtException', err => {
    console.log('⚠️ Uncaught Exception:', err);
});

// 🚀 LOGIN
client.login(process.env.TOKEN);