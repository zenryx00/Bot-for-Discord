const { EmbedBuilder } = require('discord.js');

const questions = [
    { q: "Capital de Francia?", a: "paris" },
    { q: "2 + 2?", a: "4" },
    { q: "Color del cielo?", a: "azul" }
];

module.exports = {
    name: 'trivia',

    async execute(message, args) {

        const q = questions[Math.floor(Math.random() * questions.length)];

        const embed = new EmbedBuilder()
            .setTitle('❓ Trivia')
            .setDescription(q.q)
            .setColor(0x5865f2);

        return message.reply({ embeds: [embed] });
    }
};