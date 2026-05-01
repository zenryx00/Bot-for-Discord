const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',

    async execute(message) {

        if (!message.guild) return;

        const user = message.mentions.users.first() || message.author;

        const member = await message.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('❌ Error')
                        .setColor(0xff0000)
                        .setDescription('No se pudo obtener información del usuario.')
                ]
            });
        }

        // 🧠 roles ordenados por jerarquía
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .sort((a, b) => b.position - a.position)
            .map(r => `<@&${r.id}>`)
            .join(' • ') || 'Sin roles';

        const embed = new EmbedBuilder()
            .setTitle('👤 Información del Usuario')
            .setColor(0x5865F2)
            .setThumbnail(user.displayAvatarURL({ size: 512 }))
            .addFields(
                { name: 'Usuario', value: user.tag, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Bot', value: user.bot ? 'Sí' : 'No', inline: true },

                {
                    name: 'Cuenta creada',
                    value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
                    inline: false
                },

                {
                    name: 'Ingreso al servidor',
                    value: member.joinedTimestamp
                        ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`
                        : 'No disponible',
                    inline: false
                },

                {
                    name: `Roles (${member.roles.cache.size - 1})`,
                    value: roles.length > 1024 ? 'Demasiados roles para mostrar' : roles,
                    inline: false
                }
            )
            .setFooter({ text: 'Sistema de información de usuarios' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};