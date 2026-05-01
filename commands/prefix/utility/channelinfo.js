const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'channelinfo',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [{ title: '❌ Error', description: msg, color: 0xff0000 }]
        });

        const channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]) ||
            message.channel;

        if (!channel) {
            return message.reply(error('Canal no encontrado.'));
        }

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('📺 Info del canal')
                    .addFields(
                        { name: 'Nombre', value: channel.name },
                        { name: 'ID', value: channel.id }
                    )
                    .setColor(0x3498db)
            ]
        });
    }
};