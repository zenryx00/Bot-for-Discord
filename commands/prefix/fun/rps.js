const { EmbedBuilder } = require('discord.js');

const choices = ['piedra', 'papel', 'tijera'];

module.exports = {
    name: 'rps',

    async execute(message, args) {

        const user = args[0];

        if (!user || !choices.includes(user.toLowerCase())) {
            return message.reply('❌ Usa: -rps piedra | papel | tijera');
        }

        const bot = choices[Math.floor(Math.random() * choices.length)];

        let result;

        if (user === bot) result = 'Empate 🤝';
        else if (
            (user === 'piedra' && bot === 'tijera') ||
            (user === 'papel' && bot === 'piedra') ||
            (user === 'tijera' && bot === 'papel')
        ) result = 'Ganaste <:Omg:1501396849532342495>';
        else result = 'Perdiste 💀';

        const embed = new EmbedBuilder()
            .setTitle('✂️ RPS')
            .addFields(
                { name: 'Tú', value: user, inline: true },
                { name: 'Bot', value: bot, inline: true },
                { name: 'Resultado', value: result }
            )
            .setColor(0xffa500);

        return message.reply({ embeds: [embed] });
    }
};