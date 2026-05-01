const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',

    async execute(message) {

        const sent = await message.reply('🏓 midiendo ping...');

        const botLatency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setColor(0x00ff99)
            .addFields(
                { name: '📡 Bot latency', value: `${botLatency}ms`, inline: true },
                { name: '🌐 API Discord', value: `${apiLatency}ms`, inline: true }
            )
            .setFooter({ text: 'Sistema de ping estable' })
            .setTimestamp();

        await sent.edit({ content: null, embeds: [embed] });
    }
};