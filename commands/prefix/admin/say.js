const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'say',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [
                new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription(msg)
                    .setColor(0xff0000)
            ]
        });

        const success = (msg) => ({
            embeds: [
                new EmbedBuilder()
                    .setTitle('📢 Mensaje enviado')
                    .setDescription(msg)
                    .setColor(0x00ff99)
            ]
        });

        // 🛑 SOLO ADMINS
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply(error('Solo administradores pueden usar este comando.'));
        }

        if (!args.length) {
            return message.reply(error('Usa: `-say <mensaje> #canal (opcional)`'));
        }

        // 📍 detectar canal
        const channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]);

        // 🧠 limpiar texto (quitar mención de canal)
        let text = args.join(' ');

        if (channel) {
            text = text.replace(`<#${channel.id}>`, '').trim();
        }

        if (!text) {
            return message.reply(error('Debes escribir un mensaje.'));
        }

        try {

            // 🧹 borrar comando original
            await message.delete().catch(() => {});

            // 📤 enviar mensaje
            const target = channel || message.channel;

            await target.send(text);

            return message.channel.send(success(`Enviado en ${target}`));

        } catch (err) {
            console.log('❌ Error en say:', err);
            return message.reply(error('No pude enviar el mensaje.'));
        }
    }
};