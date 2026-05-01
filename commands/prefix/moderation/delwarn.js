const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'delwarn',

    async execute(message, args) {

        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply('❌ No tienes permisos pe.');
        }

        const { getWarns } = global.utils.warns;

        const user =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0])?.user;

        const index = parseInt(args[1]);

        if (!user || isNaN(index)) {
            return message.reply('❌ Usa: `-delwarn @usuario numero`');
        }

        const path = './Data/warns.json';
        const data = JSON.parse(fs.readFileSync(path));

        if (!data[user.id] || !data[user.id][index - 1]) {
            return message.reply('❌ Warn no encontrado.');
        }

        const removed = data[user.id].splice(index - 1, 1);

        fs.writeFileSync(path, JSON.stringify(data, null, 2));

        const embed = new EmbedBuilder()
            .setTitle('🧹 Warn eliminado')
            .setColor(0x00ff99)
            .addFields(
                { name: '👤 Usuario', value: `${user}` },
                { name: '🗑 Warn borrado', value: removed[0].reason }
            )
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};