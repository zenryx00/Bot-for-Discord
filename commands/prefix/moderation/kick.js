const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',

    async execute(message, args) {

        const errorEmbed = (desc) =>
            new EmbedBuilder()
                .setTitle('❌ Error')
                .setColor(0xff0000)
                .setDescription(desc)
                .setTimestamp();

        // 🔒 permisos
        if (!message.member.permissions.has('KickMembers')) {
            return message.reply({
                embeds: [
                    errorEmbed('No tienes permisos para expulsar usuarios.')
                ]
            });
        }

        // 👤 usuario
        const user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

        if (!user) {
            return message.reply({
                embeds: [
                    errorEmbed('Debes mencionar a un usuario o proporcionar su ID.')
                ]
            });
        }

        if (!user.kickable) {
            return message.reply({
                embeds: [
                    errorEmbed('No tengo permisos para expulsar a este usuario.')
                ]
            });
        }

        const reason = args.slice(1).join(' ') || 'Sin razón especificada';

        // 🚫 kick
        await user.kick(reason);

        // ✅ embed éxito
        const embed = new EmbedBuilder()
            .setTitle('👢 Usuario expulsado')
            .setColor(0xff9900)
            .addFields(
                { name: 'Usuario', value: `${user.user.tag}`, inline: true },
                { name: 'ID', value: `${user.id}`, inline: true },
                { name: 'Razón', value: reason, inline: false }
            )
            .setFooter({ text: 'Sistema de moderación activo' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};