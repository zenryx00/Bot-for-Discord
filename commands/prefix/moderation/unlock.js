const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unlock',

    async execute(message) {

        const error = (msg) => ({
            embeds: [{ title: '❌ Error', description: msg, color: 0xff0000 }]
        });

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply(error('No tienes permisos para desbloquear canales.'));
        }

        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: true
        });

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🔓 Canal desbloqueado')
                    .setColor(0x00ff99)
            ]
        });
    }
};