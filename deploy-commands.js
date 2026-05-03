const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

// 🔐 VARIABLES DE ENTORNO (Railway)
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;

// 📂 carpeta de comandos
const commandsPath = path.join(__dirname, 'Perukistan', 'Commands', 'slash');

const commands = [];

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {

        if (!token || !clientId) {
            throw new Error('❌ Faltan variables de entorno TOKEN o CLIENT_ID');
        }

        console.log('🔄 Registrando slash commands...');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );

        console.log(`✅ ${commands.length} comandos registrados`);

    } catch (error) {
        console.error('❌ Error deploy:', error);
    }
})();