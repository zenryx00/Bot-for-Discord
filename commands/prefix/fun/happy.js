const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'happy',

    async execute(message, args) {

        try {

            let gif = null;

            try {
                const res = await fetch('https://api.waifu.pics/sfw/happy');
                const data = await res.json();
                if (data && data.url) gif = data.url;
            } catch {}

            if (!gif) {
                try {
                    const res = await fetch('https://nekos.best/api/v2/happy');
                    const data = await res.json();
                    if (data && data.results && data.results[0]) {
                        gif = data.results[0].url;
                    }
                } catch {}
            }

            if (!gif) {
                return message.reply('❌ No se pudo obtener un gif.');
            }

            const embed = new EmbedBuilder()
                .setTitle(`${message.author.username} está feliz`)
                .setColor(0x162659)
                .setImage(gif)
                .setFooter({ text: `Solicitado por ${message.author.username}` })
                .setTimestamp();

            return message.reply({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error happy:', err);
            return message.reply('❌ Error ejecutando el comando.');
        }
    }
};