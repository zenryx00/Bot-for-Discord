const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'cry',

    async execute(message, args) {

        try {

            let gif = null;

            // 🌸 API 1
            try {
                const res = await fetch('https://api.waifu.pics/sfw/cry');
                const data = await res.json();
                gif = data?.url;
            } catch {}

            // 🌸 API 2 (fallback)
            if (!gif) {
                try {
                    const res = await fetch('https://nekos.best/api/v2/cry');
                    const data = await res.json();
                    gif = data?.results?.[0]?.url;
                } catch {}
            }

            const embed = new EmbedBuilder()
                .setTitle(`${message.author.username} esta llorando`)
                .setColor(0x162659)
                .setFooter({ text: `Solicitado por ${message.author.username}` })
                .setTimestamp();

            if (gif) {
                embed.setImage(gif);
                return message.reply({ embeds: [embed] });
            }

            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('❌ Error')
                        .setColor(0xff0000)
                        .setDescription('No se pudo obtener un gif en este momento.')
                ]
            });

        } catch (err) {
            console.log('❌ Error cry:', err);

            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('❌ Error')
                        .setColor(0xff0000)
                        .setDescription('Error crítico ejecutando el comando.')
                ]
            });
        }
    }
};