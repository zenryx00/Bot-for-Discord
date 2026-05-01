const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'time',

    async execute(message, args) {

        // 🌍 zonas disponibles
        const zones = {
            usa: { tz: 'America/New_York', label: '🇺🇸 USA (New York)' },
            mexico: { tz: 'America/Mexico_City', label: '🇲🇽 México' },
            espana: { tz: 'Europe/Madrid', label: '🇪🇸 España' },
            argentina: { tz: 'America/Argentina/Buenos_Aires', label: '🇦🇷 Argentina' },
            colombia: { tz: 'America/Bogota', label: '🇨🇴 Colombia' },
            japon: { tz: 'Asia/Tokyo', label: '🇯🇵 Japón' }
        };

        const input = (args[0] || '').toLowerCase();

        if (!input) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🕒 Uso del comando')
                        .setColor(0xff0000)
                        .setDescription('Debes indicar una región:\n`usa, mexico, espana, argentina, colombia, japon`')
                ]
            });
        }

        const region = zones[input];

        if (!region) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('❌ Región inválida')
                        .setColor(0xff0000)
                        .setDescription('Regiones disponibles:\n`usa, mexico, espana, argentina, colombia, japon`')
                ]
            });
        }

        const now = new Date();

        const hora = now.toLocaleTimeString('es-ES', {
            timeZone: region.tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const fecha = now.toLocaleDateString('es-ES', {
            timeZone: region.tz,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const embed = new EmbedBuilder()
            .setTitle(`🕒 Hora en ${region.label}`)
            .setColor(0x5865F2)
            .addFields(
                { name: 'Hora', value: hora, inline: true },
                { name: 'Fecha', value: fecha, inline: true }
            )
            .setFooter({ text: 'Sistema de hora global' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};