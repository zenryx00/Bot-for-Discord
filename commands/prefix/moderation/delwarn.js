const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'delwarn',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [
                new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription(msg)
                    .setColor(0xff0000)
            ]
        });

        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply(error('No tienes permisos.'));
        }

        const user =
            message.mentions.users.first() ||
            await message.client.users.fetch(args[0]).catch(() => null);

        const index = parseInt(args[1]);

        if (!user || isNaN(index)) {
            return message.reply(error('Uso: `-delwarn @usuario número`'));
        }

        const path = './Data/warns.json';

        let data = {};
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        if (!data[user.id] || !data[user.id][index - 1]) {
            return message.reply(error('Warn no encontrado.'));
        }

        const removed = data[user.id].splice(index - 1, 1);

        fs.writeFileSync(path, JSON.stringify(data, null, 2));

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('🧹 Warn eliminado')
                    .addFields(
                        { name: 'Usuario', value: `${user.tag}` },
                        { name: 'Motivo eliminado', value: removed[0].reason },
                        { name: 'Staff', value: `<@${removed[0].staff}>` }
                    )
                    .setColor(0x00ff99)
            ]
        });
    }
};