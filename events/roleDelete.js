const log = require('../Utils/modlog');

module.exports = {
    name: 'roleDelete',

    async execute(role) {

        await log(role.guild, {
            title: '🗑️ Rol eliminado',
            color: 0xff0000,
            content: `Rol: ${role.name} (\`${role.id}\`)`
        });
    }
};