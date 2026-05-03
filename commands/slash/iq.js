const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iq')
        .setDescription('Mide tu IQ o el de alguien')
        .addUserOption(opt =>
            opt.setName('user')
                .setDescription('Usuario')
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('user') || interaction.user;

        const iq = Math.floor(Math.random() * 161);

        const embed = new EmbedBuilder()
            .setTitle('🧠 IQ Test')
            .setDescription(`${user.username} tiene un IQ de **${iq}**`)
            .setColor(0x00bfff);

        return interaction.reply({ embeds: [embed] });
    }
};