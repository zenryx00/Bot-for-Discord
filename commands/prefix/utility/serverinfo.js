const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',

    async execute(message) {

        const guild = message.guild;

        const embed = new EmbedBuilder()
            .setTitle(`🏰 ${guild.name}`)
            .setColor(0xff0000)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: '👥 Miembros', value: `${guild.memberCount}`, inline: true },
                { name: '📅 Creado', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },

                { name: '💬 Canales', value: `${guild.channels.cache.size}`, inline: true },
                { name: '🎭 Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: '🚀 Boost level', value: `${guild.premiumTier}`, inline: true }
            )
            .setFooter({ text: 'Información del servidor' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};