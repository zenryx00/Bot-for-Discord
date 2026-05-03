const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'cry',

    async execute(message, args) {

        try {

            const target =
                message.mentions.users.first() ||
                message.author;

            const size = Math.floor(Math.random() * 31);

            let comment;

            if (size === 0) comment = 'Desapareció… 😔';
            else if (size <= 5) comment = 'Pequeña pero con actitud 😎';
            else if (size <= 10) comment = 'Promedio 👀';
            else if (size <= 20) comment = 'Respetable 😳';
            else if (size <= 25) comment = 'Grande ⚠️';
            else comment = 'Nivel legendario 🗿🍌';

            let gif = null;

            // 🌸 API 1
            try {
                const res = await fetch('https://api.waifu.pics/sfw/cry');
                const data = await res.json();
                gif = data.url;
            } catch {}

            // 🌸 API 2 (fallback)
            if (!gif) {
                try {
                    const res = await fetch('https://nekos.best/api/v2/cry');
                    const data = await res.json();
                    gif = data.results[0].url;
                } catch {}
            }

            // 📦 embed base
            const embed = new EmbedBuilder()
                .setTitle(`${message.author.username} esta llorando`)
                .setColor("21255c")
                .setFooter({ text: `Solicitado por ${message.author.username}` })
                .setTimestamp();

            // 🖼️ SI HAY GIF → usarlo
            if (gif) {
                embed.setImage(gif);
                return message.reply({ embeds: [embed] });
            }

            const attachment = new AttachmentBuilder(filePath, {
                name: 'banana.gif'
            });

            embed.setImage('attachment://banana.gif');

            return message.reply({
                embeds: [embed],
                files: [attachment]
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