const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'happy',

    async execute(message, args) {

        const user =
            message.mentions.users.first() ||
            message.author;

        let gif;

        try {
            const res = await fetch('https://api.waifu.pics/sfw/happy');
            const data = await res.json();
            gif = data.url;
        } catch {
            gif = null;
        }

        const embed = new EmbedBuilder()
            .setTitle(`${user.username} está feliz 😊`)
            .setColor(0xffcc00)
            .setDescription(`${message.author} hizo sentir feliz a ${user}`)
            .setImage(gif);

        message.reply({ embeds: [embed] });
    }
};