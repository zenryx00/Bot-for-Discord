const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: 'channelinfo',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [
                new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription(msg)
                    .setColor(0xff0000)
            ]
        });

        const channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]) ||
            message.channel;

        if (!channel) {
            return message.reply(error('Canal no encontrado.'));
        }

        const typeMap = {
            [ChannelType.GuildText]: 'Texto',
            [ChannelType.GuildVoice]: 'Voz',
            [ChannelType.GuildCategory]: 'Categoría',
            [ChannelType.GuildAnnouncement]: 'Anuncios',
            [ChannelType.GuildForum]: 'Foro'
        };

        const perms = channel.permissionsFor(message.guild.members.me);

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('📺 Información del canal')
                    .setColor(0x3498db)
                    .addFields(
                        { name: 'Nombre', value: channel.name, inline: true },
                        { name: 'ID', value: channel.id, inline: true },
                        { name: 'Tipo', value: typeMap[channel.type] || 'Desconocido', inline: true },
                        { name: 'NSFW', value: channel.nsfw ? 'Sí' : 'No', inline: true },
                        { name: 'Posición', value: String(channel.position || 'N/A'), inline: true },
                        { name: 'Creado', value: `<t:${Math.floor(channel.createdTimestamp / 1000)}:F>` },
                        { name: 'Permisos del bot', value: perms.toArray().slice(0, 8).join(', ') || 'Ninguno' }
                    )
                    .setFooter({ text: 'Información avanzada del canal' })
                    .setTimestamp()
            ]
        });
    }
};