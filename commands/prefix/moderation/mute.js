const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mute',

    async execute(message, args) {

        const errorEmbed = (desc) =>
            new EmbedBuilder()
                .setTitle('❌ Error')
                .setColor(0xff0000)
                .setDescription(desc)
                .setTimestamp();

        // 🔒 permisos
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply({
                embeds: [
                    errorEmbed('No tienes permisos para mutear usuarios.')
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

        if (!user.moderatable) {
            return message.reply({
                embeds: [
                    errorEmbed('No tengo permisos para mutear a este usuario.')
                ]
            });
        }

        let time = args[1];
        const reason = args.slice(2).join(' ') || 'Sin razón especificada';

        if (!time) {
            return message.reply({
                embeds: [
                    errorEmbed('Debes especificar una duración (ej: 10m, 2h, 1d).')
                ]
            });
        }

        // ⏱ conversión de tiempo
        let ms;

        if (time.endsWith('m')) {
            ms = parseInt(time) * 60 * 1000;
        } else if (time.endsWith('h')) {
            ms = parseInt(time) * 60 * 60 * 1000;
        } else if (time.endsWith('d')) {
            ms = parseInt(time) * 24 * 60 * 60 * 1000;
        } else if (!isNaN(time)) {
            ms = parseInt(time) * 60 * 1000;
            time = `${time}m`;
        } else {
            return message.reply({
                embeds: [
                    errorEmbed('Formato inválido. Usa: 10m, 2h o 1d.')
                ]
            });
        }

        // 🔇 mute
        await user.timeout(ms, reason);

        // ✅ embed éxito
        const embed = new EmbedBuilder()
            .setTitle('🔇 Usuario muteado')
            .setColor(0x999999)
            .addFields(
                { name: 'Usuario', value: `${user.user.tag}`, inline: true },
                { name: 'ID', value: `${user.id}`, inline: true },
                { name: 'Duración', value: time, inline: false },
                { name: 'Razón', value: reason, inline: false }
            )
            .setFooter({ text: 'Sistema de moderación activo' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};