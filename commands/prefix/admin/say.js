module.exports = {
    name: 'say',

    async execute(message, args) {

        if (!args.length) {
            return message.reply('❌ Usa: `!say <mensaje> #canal (opcional)`');
        }

        // 🔍 detectar canal mencionado
        const channel = message.mentions.channels.first();

        // 🧠 quitar mención del canal del texto
        let text = args.join(' ');

        if (channel) {
            text = text.replace(`<#${channel.id}>`, '').trim();
        }

        if (!text) {
            return message.reply('❌ Debes escribir un mensaje.');
        }

        try {
            // 🧹 borrar comando original (opcional)
            message.delete().catch(() => {});

            // 📤 si hay canal, enviar ahí
            if (channel) {
                channel.send(text);
            } else {
                // 📤 si no hay canal, enviar en el mismo
                message.channel.send(text);
            }

        } catch (err) {
            console.log('❌ Error en say:', err);
            message.reply('❌ No pude enviar el mensaje');
        }
    }
};