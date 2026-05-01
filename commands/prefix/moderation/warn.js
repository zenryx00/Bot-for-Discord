const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'warn',

    async execute(message, args) {

        try {

            const error = (desc) =>
                new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setColor(0xff0000)
                    .setDescription(desc)
                    .setTimestamp();

            // 🔒 permisos
            if (!message.member.permissions.has('ModerateMembers')) {
                return message.reply({
                    embeds: [error('No tienes permisos para advertir usuarios.')]
                });
            }

            // 👤 usuario
            const user =
                message.mentions.users.first() ||
                message.guild.members.cache.get(args[0])?.user;

            if (!user) {
                return message.reply({
                    embeds: [error('Debes mencionar un usuario o usar su ID.')]
                });
            }

            const reason = args.slice(1).join(' ') || 'Sin razón especificada';

            // 💾 sistema simple en memoria (si luego quieres lo pasamos a JSON)
            if (!global.warns) global.warns = {};
            if (!global.warns[user.id]) global.warns[user.id] = [];

            global.warns[user.id].push({
                reason,
                moderator: message.author.tag,
                date: Date.now()
            });

            const totalWarns = global.warns[user.id].length;

            // 📩 DM al usuario (seguro)
            try {
                await user.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('⚠️ Has recibido una advertencia')
                            .setColor(0xffcc00)
                            .addFields(
                                { name: 'Servidor', value: message.guild.name },
                                { name: 'Moderador', value: message.author.tag },
                                { name: 'Razón', value: reason },
                                { name: 'Total de warns', value: `${totalWarns}` }
                            )
                            .setTimestamp()
                    ]
                });
            } catch {}

            // ✅ respuesta
            const embed = new EmbedBuilder()
                .setTitle('⚠️ Usuario advertido')
                .setColor(0xffcc00)
                .addFields(
                    { name: 'Usuario', value: user.tag, inline: true },
                    { name: 'ID', value: user.id, inline: true },
                    { name: 'Razón', value: reason, inline: false },
                    { name: 'Total de warns', value: `${totalWarns}`, inline: true }
                )
                .setTimestamp();

            message.reply({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error warn:', err);

            try {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('❌ Error interno')
                            .setColor(0xff0000)
                            .setDescription('No se pudo ejecutar el warn.')
                    ]
                });
            } catch {}
        }
    }
};