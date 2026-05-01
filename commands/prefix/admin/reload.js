const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'reload',

    async execute(message) {

        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ No tienes permisos para usar esto.');
        }

        try {

            const client = message.client;

            // 🧠 limpiar cache completo de comandos
            function clearCache(dir) {

                const files = fs.readdirSync(dir);

                for (const file of files) {

                    const fullPath = path.join(dir, file);

                    if (fs.statSync(fullPath).isDirectory()) {
                        clearCache(fullPath);
                    } else if (file.endsWith('.js')) {

                        delete require.cache[require.resolve(fullPath)];
                    }
                }
            }

            const commandsPath = path.join(global.basePath, 'commands');

            clearCache(commandsPath);

            // 🧹 limpiar colección
            client.commands.clear();

            // 📦 recargar comandos
            function loadCommands(dir) {

                const files = fs.readdirSync(dir);
                let loaded = 0;

                for (const file of files) {

                    const fullPath = path.join(dir, file);

                    if (fs.statSync(fullPath).isDirectory()) {
                        loaded += loadCommands(fullPath);
                        continue;
                    }

                    if (!file.endsWith('.js')) continue;

                    const command = require(fullPath);

                    if (!command || !command.name) continue;

                    client.commands.set(command.name, command);

                    loaded++;
                }

                return loaded;
            }

            const total = loadCommands(commandsPath);

            const embed = new EmbedBuilder()
                .setTitle('🔄 Reload completado')
                .setColor(0x00ff99)
                .addFields(
                    { name: '📦 Comandos recargados', value: `${total}`, inline: true }
                )
                .setTimestamp();

            return message.reply({ embeds: [embed] });

        } catch (err) {

            console.log(err);

            const embed = new EmbedBuilder()
                .setTitle('❌ Error en reload')
                .setColor(0xff0000)
                .setDescription('No se pudieron recargar los comandos correctamente');

            return message.reply({ embeds: [embed] });
        }
    }
};