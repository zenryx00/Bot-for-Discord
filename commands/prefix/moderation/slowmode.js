const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'slowmode',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [{ title: '❌ Error', description: msg, color: 0xff0000 }]
        });

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply(error('No tienes permisos.'));
        }

        const time = parseInt(args[0]);

        if (!time) {
            return message.reply(error('Usa: -slowmode 5'));
        }

        message.channel.setRateLimitPerUser(time);

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🐢 Slowmode activado')
                    .setDescription(`${time}s`)
                    .setColor(0xffff00)
            ]
        });
    }
};