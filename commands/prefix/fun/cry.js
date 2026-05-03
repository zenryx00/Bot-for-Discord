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
                if (data && data.url) gif = data.url;
            } catch (e) {
                console.log('API 1 fallo');
            }

            // 🌸 API 2
            if (!gif) {
                try {
                    const res = await fetch('https://nekos.best/api/v2/cry');
                    const data = await res.json();
                    if (data && data.results && data.results[0]) {
                        gif = data.results[0].url;
                    }
                } catch (e) {
                    console.log('API 2 fallo');
                }
            }

            // ❌ si no hay gif
            if (!gif) {
                return message.reply('❌ No se pudo obtener un gif.');
            }

            const embed = new EmbedBuilder()
                .setTitle(`${message.author.username} está llorando`)
                .setColor(0x162659)
                .setImage(gif)
                .setFooter({ text: `Solicitado por ${message.author.username}` })
                .setTimestamp();

            return message.reply({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error cry:', err);
            return message.reply('❌ Error ejecutando el comando.');
        }
    }
};