const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Número aleatorio')
        .addIntegerOption(opt =>
            opt.setName('max')
                .setDescription('Número máximo')
                .setRequired(true)
        ),

    async execute(interaction) {

        const max = interaction.options.getInteger('max');
        const result = Math.floor(Math.random() * max) + 1;

        const embed = new EmbedBuilder()
            .setTitle('🔢 Roll')
            .setDescription(`Resultado: **${result} / ${max}**`)
            .setColor(0x00bfff);

        return interaction.reply({ embeds: [embed] });
    }
};