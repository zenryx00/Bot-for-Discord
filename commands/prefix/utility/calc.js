const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'calc',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [{ title: '❌ Error', description: msg, color: 0xff0000 }]
        });

        const expr = args.join(' ');

        if (!expr) {
            return message.reply(error('Usa: -calc 2+2'));
        }

        try {
            const result = eval(expr.replace(/[^0-9+\-*/().]/g, ''));

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🧮 Calculadora')
                        .addFields(
                            { name: 'Expresión', value: expr },
                            { name: 'Resultado', value: String(result) }
                        )
                        .setColor(0x00ff99)
                ]
            });

        } catch {
            message.reply(error('Expresión inválida'));
        }
    }
};