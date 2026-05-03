const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
    name: 'drake',

    async execute(message, args) {

        const top = args.slice(0).join(' ');
        const bottom = args.slice(1).join(' ');

        if (!top || !bottom) {
            return message.reply('❌ Usa: -drake texto1 | texto2');
        }

        const canvas = createCanvas(600, 600);
        const ctx = canvas.getContext('2d');

        const img = await loadImage('https://i.imgur.com/vA0XQ8H.jpg');

        ctx.drawImage(img, 0, 0, 600, 600);

        ctx.fillStyle = 'white';
        ctx.font = '30px sans-serif';

        ctx.fillText(top, 20, 80);
        ctx.fillText(bottom, 20, 550);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), {
            name: 'drake.png'
        });

        return message.reply({ files: [attachment] });
    }
};