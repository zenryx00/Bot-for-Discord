const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'roleinfo',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [{ title: '❌ Error', description: msg, color: 0xff0000 }]
        });

        const role =
            message.mentions.roles.first() ||
            message.guild.roles.cache.get(args[0]);

        if (!role) {
            return message.reply(error('Rol no encontrado.'));
        }

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🎭 Info del rol')
                    .addFields(
                        { name: 'Nombre', value: role.name },
                        { name: 'ID', value: role.id },
                        { name: 'Miembros', value: String(role.members.size) }
                    )
                    .setColor(role.color || 0x5865f2)
            ]
        });
    }
};