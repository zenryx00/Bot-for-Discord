const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'purge',

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
                    .setTitle('🧹 Mensajes eliminados')
                    .setDescription(msg)
                    .setColor(0x00ff99)
            ]
        });

        // 🛑 PERMISOS
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply(error('No tienes permisos para eliminar mensajes.'));
        }

        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.reply(error('No tengo permisos para eliminar mensajes.'));
        }

        const amount = parseInt(args[0]);

        if (!amount || isNaN(amount)) {
            return message.reply(error('Usa: `-purge 10`'));
        }

        if (amount < 1 || amount > 100) {
            return message.reply(error('Solo puedes borrar entre 1 y 100 mensajes.'));
        }

        try {

            // 🧹 borrar mensajes
            const deleted = await message.channel.bulkDelete(amount, true);

            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('🧹 Purge completado')
                        .setDescription(`Se eliminaron **${deleted.size} mensajes**`)
                        .setColor(0x00ff99)
                ]
            }).then(msg => {
                setTimeout(() => msg.delete().catch(() => {}), 5000);
            });

        } catch (err) {
            console.log('❌ Error purge:', err);

            return message.reply(error('No se pudieron eliminar los mensajes (pueden ser muy antiguos).'));
        }
    }
};