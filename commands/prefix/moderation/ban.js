const { EmbedBuilder } = require('discord.js');
const { addBan } = global.utils.bans;

module.exports = {
    name: 'ban',

    async execute(message, args) {

        const errorEmbed = (desc) =>
            new EmbedBuilder()
                .setTitle('❌ Error')
                .setColor(0xff0000)
                .setDescription(desc)
                .setTimestamp();

        // 🔒 permisos
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply({
                embeds: [
                    errorEmbed('No tienes permisos para banear usuarios.')
                ]
            });
        }

        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

        if (!member) {
            return message.reply({
                embeds: [
                    errorEmbed('Debes mencionar a un usuario o proporcionar su ID.')
                ]
            });
        }

        if (!member.bannable) {
            return message.reply({
                embeds: [
                    errorEmbed('No tengo permisos para banear a este usuario.')
                ]
            });
        }

        let time = args[1];
        const reason = args.slice(2).join(' ') || 'Sin razón especificada';

        let expiresAt = null;
        let type = 'PERMANENTE';

        // ⏱ BAN TEMPORAL
        if (time) {

            let ms;

            if (time.endsWith('m')) {
                ms = parseInt(time) * 60 * 1000;
            } 
            else if (time.endsWith('h')) {
                ms = parseInt(time) * 60 * 60 * 1000;
            } 
            else if (time.endsWith('d')) {
                ms = parseInt(time) * 24 * 60 * 60 * 1000;
            } 
            else if (time.endsWith('y')) {
                ms = parseInt(time) * 365 * 24 * 60 * 60 * 1000;
            } 
            else {
                return message.reply({
                    embeds: [
                        errorEmbed('Formato de tiempo inválido. Usa: 10m, 2h, 1d, 1y.')
                    ]
                });
            }

            expiresAt = Date.now() + ms;
            type = `TEMPORAL (${time})`;
        }

        // 🚫 ban
        await member.ban({ reason });

        // 💾 guardar temporal
        if (expiresAt) {
            addBan(member.id, {
                guildId: message.guild.id,
                expiresAt,
                reason
            });
        }

        // ✅ embed éxito
        const embed = new EmbedBuilder()
            .setTitle('🔨 Usuario baneado')
            .setColor(0xff0000)
            .addFields(
                { name: 'Usuario', value: `${member.user.tag}`, inline: true },
                { name: 'ID', value: `${member.id}`, inline: true },
                { name: 'Tipo de sanción', value: type, inline: false },
                { name: 'Razón', value: reason, inline: false }
            )
            .setFooter({ text: 'Sistema de moderación activo' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};