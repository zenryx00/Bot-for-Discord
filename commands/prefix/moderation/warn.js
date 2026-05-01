const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'warn',

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
                    .setTitle('⚠️ Warn aplicado')
                    .setDescription(msg)
                    .setColor(0xffcc00)
            ]
        });

        // 🛑 PERMISOS
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply(error('No tienes permisos para dar warns.'));
        }

        const user =
            message.mentions.users.first() ||
            await message.client.users.fetch(args[0]).catch(() => null);

        const reason = args.slice(1).join(' ') || 'Sin motivo especificado';

        if (!user) {
            return message.reply(error('Debes mencionar un usuario o usar su ID.'));
        }

        const path = './Data/warns.json';

        let data = {};
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        if (!data[user.id]) data[user.id] = [];

        const warnData = {
            reason,
            staff: message.author.id,
            date: new Date().toISOString()
        };

        data[user.id].push(warnData);

        fs.writeFileSync(path, JSON.stringify(data, null, 2));

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('⚠️ Usuario advertido')
                    .addFields(
                        { name: 'Usuario', value: `${user.tag}` },
                        { name: 'Motivo', value: reason },
                        { name: 'Staff', value: `${message.author.tag}` },
                        { name: 'Fecha', value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
                    )
                    .setColor(0xffcc00)
            ]
        });
    }
};