const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'roll',

    async execute(message, args) {

        const max = parseInt(args[0]);
        if (!max || isNaN(max)) {
            return message.reply('❌ Usa: -roll <numero>');
        }

        const result = Math.floor(Math.random() * max) + 1;

        const embed = new EmbedBuilder()
            .setTitle('🔢 Roll')
            .setDescription(`Resultado: **${result} / ${max}**`)
            .setColor(0x00bfff);

        return message.reply({ embeds: [embed] });
    }
};