const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'warnings',

    async execute(message, args) {

        const { getWarns } = global.utils.warns;

        const user =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0])?.user ||
            message.author;

        const warns = getWarns(user.id);

        if (!warns.length) {
            return message.reply(`✅ ${user.username} Este usuario está limpio 🏆`);
        }

        let list = '';

        warns.forEach((w, i) => {
            const date = new Date(w.date).toLocaleString();
            list += `\n⚠️ **${i + 1}.** ${w.reason}\n📅 ${date}\n`;
        });

        const embed = new EmbedBuilder()
            .setTitle(`📋 Warnings de ${user.username}`)
            .setColor(0xffcc00)
            .setDescription(list)
            .setFooter({ text: `Total warns: ${warns.length}` })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};