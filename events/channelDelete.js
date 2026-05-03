const log = require('../Utils/modlog');

module.exports = {
    name: 'channelDelete',

    async execute(channel) {

        if (!channel.guild) return;

        await log(channel.guild, {
            title: '🗑️ Canal eliminado',
            color: 0xff0000,
            content: `Canal: ${channel.name} (\`${channel.id}\`)`
        });
    }
};