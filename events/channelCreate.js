const log = require('../Utils/modlog');

module.exports = {
    name: 'channelCreate',

    async execute(channel) {

        if (!channel.guild) return;

        await log(channel.guild, {
            title: '📁 Canal creado',
            color: 0x00ff00,
            content: `Canal: #${channel.name} (\`${channel.id}\`)`
        });
    }
};