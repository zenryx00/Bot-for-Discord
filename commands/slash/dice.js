const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Lanza un dado 🎲'),

    async execute(interaction) {

        const result = Math.floor(Math.random() * 6) + 1;

        const embed = new EmbedBuilder()
            .setTitle('🎲 Dice')
            .setDescription(`Has sacado: **${result}**`)
            .setColor(0xffffff);

        return interaction.reply({ embeds: [embed] });
    }
};