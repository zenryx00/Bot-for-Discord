const log = require('../Utils/modlog');

module.exports = {
    name: 'guildMemberUpdate',

    async execute(oldMember, newMember) {

        const oldRoles = oldMember.roles.cache;
        const newRoles = newMember.roles.cache;

        const added = newRoles.filter(r => !oldRoles.has(r.id));
        const removed = oldRoles.filter(r => !newRoles.has(r.id));

        if (added.size > 0) {
            await log(newMember.guild, {
                title: '➕ Rol añadido',
                color: 0x00ff00,
                user: newMember.user,
                content: `Rol: ${added.map(r => r.name).join(', ')}`
            });
        }

        if (removed.size > 0) {
            await log(newMember.guild, {
                title: '➖ Rol removido',
                color: 0xff0000,
                user: newMember.user,
                content: `Rol: ${removed.map(r => r.name).join(', ')}`
            });
        }
    }
};