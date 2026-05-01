const { EmbedBuilder } = require('discord.js');
const { getActionGif } = require('../../utils/gifs');

module.exports = {
    name: 'bye',

    async execute(message) {

        const user = message.mentions.users.first() || message.author;

        const gif = await getActionGif('bye', 'https://media.tenor.com/bye.gif');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${user.username} se despide 👋`)
                    .setImage(gif)
                    .setColor(0x5865f2)
            ]
        });
    }
};