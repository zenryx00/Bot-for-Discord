const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const questions = [
    { q: "Capital de Francia?", a: "paris" },
    { q: "2 + 2?", a: "4" },
    { q: "Color del cielo?", a: "azul" }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Pregunta trivia'),

    async execute(interaction) {

        const q = questions[Math.floor(Math.random() * questions.length)];

        const embed = new EmbedBuilder()
            .setTitle('❓ Trivia')
            .setDescription(q.q)
            .setColor(0x5865f2);

        return interaction.reply({ embeds: [embed] });
    }
};