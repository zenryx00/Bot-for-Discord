const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stonks')
        .setDescription('Stonks con tu avatar 📈'),

    async execute(interaction) {

        const user = interaction.user;
        const avatarURL = user.displayAvatarURL({ extension: 'png', size: 256 });

        const canvas = createCanvas(700, 500);
        const ctx = canvas.getContext('2d');

        const bg = await loadImage('https://i.imgur.com/8QfQh5X.png'); // stonks meme base
        const avatar = await loadImage(avatarURL);

        ctx.drawImage(bg, 0, 0, 700, 500);

        // avatar en cara (ajustado)
        ctx.drawImage(avatar, 320, 120, 120, 120);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), {
            name: 'stonks.png'
        });

        return interaction.reply({ files: [attachment] });
    }
};