const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const respuestas = [
    "Sí 👍",
    "No 👎",
    "Tal vez 🤔",
    "Definitivamente sí 😎",
    "Definitivamente no 😬",
    "No lo creo ❌",
    "Claro que sí 🔥",
    "Pregunta más tarde ⏳"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Hazle una pregunta al oráculo')
        .addStringOption(opt =>
            opt.setName('pregunta')
                .setDescription('Tu pregunta')
                .setRequired(true)
        ),

    async execute(interaction) {

        const pregunta = interaction.options.getString('pregunta');
        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new EmbedBuilder()
            .setTitle('🎱 8Ball')
            .addFields(
                { name: '❓ Pregunta', value: pregunta },
                { name: '🔮 Respuesta', value: respuesta }
            )
            .setColor(0x9b59b6);

        return interaction.reply({ embeds: [embed] });
    }
};