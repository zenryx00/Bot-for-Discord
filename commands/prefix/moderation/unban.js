const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unban',

    async execute(message, args) {

        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('❌ No tienes permisos.');
        }

        const userId = args[0];
        if (!userId) return message.reply('❌ Usa: `-unban ID`');

        await message.guild.members.unban(userId);

        const embed = new EmbedBuilder()
            .setTitle('🔓 Usuario desbaneado')
            .setColor(0x00ff99)
            .setDescription(`ID: ${userId}`)
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};