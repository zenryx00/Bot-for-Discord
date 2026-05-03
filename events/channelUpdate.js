const log = require('../Utils/modlog');

module.exports = {
    name: 'channelUpdate',

    async execute(oldChannel, newChannel) {

        if (!oldChannel.guild) return;

        let changes = [];

        if (oldChannel.name !== newChannel.name) {
            changes.push(`Nombre: ${oldChannel.name} → ${newChannel.name}`);
        }

        if (oldChannel.permissionOverwrites.cache.size !== newChannel.permissionOverwrites.cache.size) {
            changes.push('Permisos del canal modificados');
        }

        if (changes.length === 0) return;

        await log(oldChannel.guild, {
            title: '⚙️ Canal actualizado',
            color: 0xffcc00,
            content: changes.join('\n')
        });
    }
};