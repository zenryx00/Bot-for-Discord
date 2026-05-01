const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lock',

    async execute(message) {

        const error = (msg) => ({
            embeds: [{ title: '❌ Error', description: msg, color: 0xff0000 }]
        });

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply(error('No tienes permisos para bloquear canales.'));
        }

        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: false
        });

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🔒 Canal bloqueado')
                    .setColor(0xff0000)
            ]
        });
    }
};