const log = require('../Utils/modlog');

module.exports = {
    name: 'roleCreate',

    async execute(role) {

        await log(role.guild, {
            title: '🎭 Rol creado',
            color: 0x00ff00,
            content: `Rol: ${role.name} (\`${role.id}\`)`
        });
    }
};