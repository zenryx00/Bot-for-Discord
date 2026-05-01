const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'bye',

    async execute(message) {

        const user =
            message.mentions.users.first() ||
            message.author;

        let gif;

        try {
            const res = await fetch('https://api.waifu.pics/sfw/bye');
            const data = await res.json();
            gif = data.url;
        } catch {
            gif = null;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${user.username} se despide 👋`)
            .setColor(0x5865f2)
            .setImage(gif);

        message.reply({ embeds: [embed] });
    }
};