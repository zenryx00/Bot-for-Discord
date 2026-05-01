const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'choose',

    async execute(message, args) {

        const options = message.content.split('/');

        if (options.length < 2) {
            return message.reply('❌ Usa: -choose pizza | hamburguesa');
        }

        const choice = options[Math.floor(Math.random() * options.length)];

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🤖 Elección')
                    .setDescription(`Yo elijo: **${choice.trim()}**`)
                    .setColor(0x5865f2)
            ]
        });
    }
};