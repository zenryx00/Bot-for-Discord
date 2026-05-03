const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

async function deployCommands() {

    const token = process.env.TOKEN;
    const clientId = process.env.CLIENT_ID;

    // 🔥 USA TU RUTA REAL
    const commandsPath = path.join(__dirname, 'commands', 'slash');

    const commands = [];

    if (fs.existsSync(commandsPath)) {

        const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

        for (const file of files) {
            const command = require(path.join(commandsPath, file));

            if (command.data) {
                commands.push(command.data.toJSON());
            }
        }
    } else {
        console.log('❌ No existe carpeta:', commandsPath);
    }

    const rest = new REST({ version: '10' }).setToken(token);

    await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
    );

    console.log(`📡 Slash commands registrados: ${commands.length}`);
}

module.exports = deployCommands;