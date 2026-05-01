const { EmbedBuilder } = require('discord.js');
const { getNekoGif } = require('../../utils/gifs');

module.exports = {
    name: 'neko',

    async execute(message) {

        const user = message.mentions.users.first() || message.author;

        const gif = await getNekoGif();

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🐱 Neko')
                    .setDescription(`${user.username} encontró un neko`)
                    .setImage(gif)
                    .setColor(0xffb6c1)
            ]
        });
    }
};