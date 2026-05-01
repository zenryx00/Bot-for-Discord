const { EmbedBuilder } = require('discord.js');

module.exports = async function sendModerationDM(user, data) {
    try {

        const embed = new EmbedBuilder()
            .setTitle('🔔 Notificación de sanción')
            .setColor(0xff0000)
            .addFields(
                { name: 'Tipo', value: data.type, inline: true },
                { name: 'Servidor', value: data.guild, inline: true },
                { name: 'Moderador', value: data.moderator, inline: false },
                { name: 'Razón', value: data.reason }
            )
            .setTimestamp();

        if (data.duration) {
            embed.addFields({ name: 'Duración', value: data.duration });
        }

        await user.send({ embeds: [embed] }).catch(() => {});

    } catch (err) {
        console.log('⚠️ Error enviando DM de sanción:', err.message);
    }
};