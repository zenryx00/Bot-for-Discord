const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../Data/guilds.json');

module.exports = async (guild, data) => {

    try {

        if (!fs.existsSync(filePath)) return;

        const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const guildData = db[guild.id];

        if (!guildData?.modlogChannel) return;

        const channel = guild.channels.cache.get(guildData.modlogChannel);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle(data.title || '📌 Log')
            .setColor(data.color || 0x2b2d31)
            .setTimestamp();

        // 👤 Usuario afectado
        if (data.user) {
            embed.addFields({
                name: '👤 Usuario',
                value: `${data.user.tag} (\`${data.user.id}\`)`,
                inline: true
            });

            embed.setThumbnail(data.user.displayAvatarURL?.() || null);
        }

        // 🛡️ Moderador
        if (data.moderator) {
            embed.addFields({
                name: '🛡️ Moderador',
                value: `${data.moderator.tag}`,
                inline: true
            });
        }

        // 📄 Razón
        if (data.reason) {
            embed.addFields({
                name: '📄 Razón',
                value: data.reason
            });
        }

        // 💬 Mensaje original / contenido
        if (data.content) {
            embed.addFields({
                name: '💬 Contenido',
                value: data.content
            });
        }

        // 🔗 Link al mensaje
        if (data.messageLink) {
            embed.addFields({
                name: '🔗 Mensaje',
                value: `[Ir al mensaje](${data.messageLink})`
            });
        }

        await channel.send({ embeds: [embed] });

    } catch (err) {
        console.log('❌ Error modlog:', err);
    }
};