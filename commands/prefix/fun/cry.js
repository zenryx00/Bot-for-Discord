const { EmbedBuilder } = require('discord.js');
const { getActionGif } = require('../../utils/gifs');

module.exports = {
    name: 'cry',

    async execute(message) {

        const user = message.mentions.users.first() || message.author;

        const gif = await getActionGif('cry', 'https://media.tenor.com/cry.gif');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${user.username} está llorando 😢`)
                    .setImage(gif)
                    .setColor(0x3498db)
            ]
        });
    }
};