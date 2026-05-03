const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'dice',

    async execute(message, args) {

        const result = Math.floor(Math.random() * 6) + 1;

        const embed = new EmbedBuilder()
            .setTitle('🎲 Dice')
            .setDescription(`Has sacado: **${result}**`)
            .setColor(0xffffff);

        return message.reply({ embeds: [embed] });
    }
};