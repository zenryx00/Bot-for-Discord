const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'flip',

    async execute(message) {

        const result = Math.random() < 0.5 ? 'Cara' : 'Cruz';

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🪙 Coin Flip')
                    .setDescription(`Resultado: **${result}**`)
                    .setColor(0xffd700)
            ]
        });
    }
};