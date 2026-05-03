const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unlock',

    async execute(message, args) {

        try {

            // 🔒 permisos
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                return message.reply('❌ No tienes permisos para desbloquear canales.');
            }

            // 🎯 canal mencionado o actual
            const channel = message.mentions.channels.first() || message.channel;

            // 🔓 permitir mensajes
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: true
            });

            const embed = new EmbedBuilder()
                .setTitle('🔓 Canal desbloqueado')
                .setColor(0x00ff00)
                .addFields(
                    { name: '📌 Canal', value: `${channel}` },
                    { name: '🛡️ Staff', value: `${message.author.tag}` }
                )
                .setTimestamp();

            return message.channel.send({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error unlock:', err);
            return message.reply('❌ Error desbloqueando el canal.');
        }
    }
};