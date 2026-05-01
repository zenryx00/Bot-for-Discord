const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'roleinfo',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [
                new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription(msg)
                    .setColor(0xff0000)
            ]
        });

        const role =
            message.mentions.roles.first() ||
            message.guild.roles.cache.get(args[0]);

        if (!role) {
            return message.reply(error('Rol no encontrado. Usa mención o ID.'));
        }

        const members = role.members.size;

        const permissions = role.permissions.toArray().slice(0, 10).join(', ') || 'Sin permisos especiales';

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🎭 Información del rol')
                    .setColor(role.color || 0x5865f2)
                    .addFields(
                        { name: 'Nombre', value: role.name, inline: true },
                        { name: 'ID', value: role.id, inline: true },
                        { name: 'Miembros', value: String(members), inline: true },
                        { name: 'Color', value: role.hexColor, inline: true },
                        { name: 'Posición', value: String(role.position), inline: true },
                        { name: 'Creado', value: `<t:${Math.floor(role.createdTimestamp / 1000)}:F>` },
                        { name: 'Permisos (top)', value: permissions }
                    )
                    .setTimestamp()
            ]
        });
    }
};