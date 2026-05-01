const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'reloadall',

    async execute(message, args, client) {

        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Sin permisos.');
        }

        try {

            // 🧠 1. LIMPIAR CACHE COMPLETO DE NODE
            for (const key in require.cache) {
                delete require.cache[key];
            }

            // 🧠 2. LIMPIAR COMANDOS
            client.commands.clear();

            // 🧠 3. RECARGAR COMANDOS
            const loadCommands = (dir) => {
                const files = fs.readdirSync(dir);

                for (const file of files) {
                    const fullPath = path.join(dir, file);

                    if (fs.statSync(fullPath).isDirectory()) {
                        loadCommands(fullPath);
                    } else if (file.endsWith('.js')) {

                        const command = require(fullPath);

                        if (command?.name) {
                            client.commands.set(command.name, command);
                        }
                    }
                }
            };

            loadCommands(path.join(__dirname, '../../commands'));

            // 🧠 4. RECARGAR UTILS (forzar re-require)
            const utilsPath = path.join(__dirname, '../../utils');

            if (fs.existsSync(utilsPath)) {
                const utilsFiles = fs.readdirSync(utilsPath);

                for (const file of utilsFiles) {
                    const full = path.join(utilsPath, file);

                    if (file.endsWith('.js')) {
                        delete require.cache[require.resolve(full)];
                        require(full);
                    }
                }
            }

            // 🧠 5. RECARGAR DATA (si existe carpeta)
            const dataPath = path.join(__dirname, '../../data');

            if (fs.existsSync(dataPath)) {
                const dataFiles = fs.readdirSync(dataPath);

                for (const file of dataFiles) {
                    const full = path.join(dataPath, file);

                    if (file.endsWith('.js') || file.endsWith('.json')) {
                        delete require.cache[require.resolve(full)];

                        if (file.endsWith('.js')) {
                            require(full);
                        }
                    }
                }
            }

            return message.reply('✅ RELOAD TOTAL COMPLETADO (commands + utils + data + cache)');

        } catch (err) {
            console.error(err);
            return message.reply('❌ Error en reload total.');
        }
    }
};