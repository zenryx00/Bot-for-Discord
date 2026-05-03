const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '8ball',

    async execute(message, args) {

        if (!args.length) {
            return message.reply('❌ Debes escribir una pregunta.');
        }

        if (args.length > 6) {
            return message.reply('❌ La pregunta debe tener máximo 6 palabras.');
        }

        const respuestas = [
            'Sí.',
            'No.',
            'Tal vez.',
            'Es muy probable.',
            'No lo creo.',
            'Inténtalo más tarde.'
        ];

        const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new EmbedBuilder()
            .setTitle('🎱 8Ball')
            .setColor(0x5865F2)
            .addFields(
                { name: 'Pregunta', value: args.join(' ') },
                { name: 'Respuesta', value: respuesta }
            )
            .setFooter({ text: `Solicitado por ${message.author.username}` })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};