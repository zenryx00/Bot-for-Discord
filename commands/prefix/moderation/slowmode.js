const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'slowmode',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [
                new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription(msg)
                    .setColor(0xff0000)
            ]
        });

        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.reply(error('No tienes permisos.'));
        }

        const input = args[0];

        if (!input) {
            return message.reply(error('Usa: `-slowmode 5` o `-slowmode off`'));
        }

        // 🔴 apagar slowmode
        if (input.toLowerCase() === 'off') {
            await message.channel.setRateLimitPerUser(0);

            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🐢 Slowmode desactivado')
                        .setColor(0x00ff99)
                ]
            });
        }

        const time = parseInt(input);

        if (isNaN(time)) {
            return message.reply(error('Valor inválido. Usa número o "off".'));
        }

        await message.channel.setRateLimitPerUser(time);

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🐢 Slowmode activado')
                    .setDescription(`Tiempo: **${time}s**`)
                    .setColor(0xffff00)
            ]
        });
    }
};