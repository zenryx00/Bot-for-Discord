const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
    name: 'stonks',

    async execute(message, args) {

        const user =
            message.mentions.users.first() ||
            message.author;

        const avatarURL = user.displayAvatarURL({ extension: 'png', size: 256 });

        const canvas = createCanvas(700, 500);
        const ctx = canvas.getContext('2d');

        const bg = await loadImage('https://i.imgur.com/8QfQh5X.png');
        const avatar = await loadImage(avatarURL);

        ctx.drawImage(bg, 0, 0, 700, 500);
        ctx.drawImage(avatar, 320, 120, 120, 120);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), {
            name: 'stonks.png'
        });

        return message.reply({ files: [attachment] });
    }
};