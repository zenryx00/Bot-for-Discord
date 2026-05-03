const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drake')
        .setDescription('Meme Drake 🧠')
        .addStringOption(o =>
            o.setName('top')
                .setDescription('Texto arriba')
                .setRequired(true)
        )
        .addStringOption(o =>
            o.setName('bottom')
                .setDescription('Texto abajo')
                .setRequired(true)
        ),

    async execute(interaction) {

        const top = interaction.options.getString('top');
        const bottom = interaction.options.getString('bottom');

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

        return interaction.reply({ files: [attachment] });
    }
};