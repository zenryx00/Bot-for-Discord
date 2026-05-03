const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lock',

    async execute(message, args) {

        try {

            // 🔒 permisos
            if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                return message.reply('❌ No tienes permisos para bloquear canales.');
            }

            // 🎯 canal mencionado o canal actual
            const channel = message.mentions.channels.first() || message.channel;

            // 🔐 bloquear envío de mensajes
            await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: false
            });

            const embed = new EmbedBuilder()
                .setTitle('🔒 Canal bloqueado')
                .setColor(0xff0000)
                .addFields(
                    { name: '📌 Canal', value: `${channel}` },
                    { name: '🛡️ Staff', value: `${message.author.tag}` }
                )
                .setTimestamp();

            return message.channel.send({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error lock:', err);
            return message.reply('❌ Error bloqueando el canal.');
        }
    }
};