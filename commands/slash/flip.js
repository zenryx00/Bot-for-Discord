const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Lanza una moneda'),

    async execute(interaction) {

        const result = Math.random() < 0.5 ? 'Cara' : 'Cruz';

        const embed = new EmbedBuilder()
            .setTitle('🪙 Coin Flip')
            .setDescription(`Resultado: **${result}**`)
            .setColor(0xffffff);

        return interaction.reply({ embeds: [embed] });
    }
};