const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const facts = [
    "Los pulpos tienen tres corazones 🐙",
    "Las abejas pueden reconocer rostros humanos 🐝",
    "Un día en Venus es más largo que su año 🌌",
    "Los tiburones existían antes que los árboles 🦈",
    "El corazón de una ballena puede pesar 180 kg 🐋"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fact')
        .setDescription('Dato curioso aleatorio'),

    async execute(interaction) {

        const fact = facts[Math.floor(Math.random() * facts.length)];

        const embed = new EmbedBuilder()
            .setTitle('💡 Fun Fact')
            .setDescription(fact)
            .setColor(0x1abc9c);

        return interaction.reply({ embeds: [embed] });
    }
};