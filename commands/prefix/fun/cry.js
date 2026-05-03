const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'cry',

    async execute(message, args) {

        try {

            const target =
                message.mentions.users.first() ||
                message.author;
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
                .setColor(0xFFD700) 
                .setFooter({ text: `Solicitado por ${message.author.username}` })
                .setTimestamp();

            // 🖼️ SI HAY GIF → usarlo
            if (gif) {
                embed.setImage(gif);
                return message.reply({ embeds: [embed] });
            }

            // 💀 SI TODO FALLA → imagen local
            const filePath = path.join(global.basePath, 'utils', 'banana.gif');

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