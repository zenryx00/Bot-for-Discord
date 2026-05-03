const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('choose')
        .setDescription('Elige entre opciones')
        .addStringOption(opt =>
            opt.setName('opciones')
                .setDescription('Separa con | ejemplo: comer|dormir|jugar')
                .setRequired(true)
        ),

    async execute(interaction) {

        const opciones = interaction.options.getString('opciones').split('|');

        const choice = opciones[Math.floor(Math.random() * opciones.length)];

        const embed = new EmbedBuilder()
            .setTitle('🎯 Choice')
            .addFields(
                { name: 'Opciones', value: opciones.join(', ') },
                { name: 'Elegido', value: choice }
            )
            .setColor(0xf1c40f);

        return interaction.reply({ embeds: [embed] });
    }
};