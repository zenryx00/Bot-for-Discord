const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const choices = ['piedra', 'papel', 'tijera'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Piedra papel o tijera')
        .addStringOption(opt =>
            opt.setName('choice')
                .setDescription('Elige')
                .setRequired(true)
                .addChoices(
                    { name: 'piedra', value: 'piedra' },
                    { name: 'papel', value: 'papel' },
                    { name: 'tijera', value: 'tijera' }
                )
        ),

    async execute(interaction) {

        const user = interaction.options.getString('choice');
        const bot = choices[Math.floor(Math.random() * choices.length)];

        let result;

        if (user === bot) result = 'Empate 🤝';
        else if (
            (user === 'piedra' && bot === 'tijera') ||
            (user === 'papel' && bot === 'piedra') ||
            (user === 'tijera' && bot === 'papel')
        ) result = 'Ganaste 🎉';
        else result = 'Perdiste 💀';

        const embed = new EmbedBuilder()
            .setTitle('✂️ RPS')
            .addFields(
                { name: 'Tú', value: user, inline: true },
                { name: 'Bot', value: bot, inline: true },
                { name: 'Resultado', value: result }
            )
            .setColor(0xffa500);

        return interaction.reply({ embeds: [embed] });
    }
};