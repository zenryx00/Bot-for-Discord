const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'purges',

    async execute(message, args) {

        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('❌ No tienes permisos.');
        }

        const amount = parseInt(args[0]);
        if (!amount || amount > 100 || amount < 1) {
            return message.reply('❌ Usa: `-clear 1-100`');
        }

        await message.channel.bulkDelete(amount, true);

        const embed = new EmbedBuilder()
            .setTitle('🧹 Mensajes eliminados')
            .setColor(0x00ffcc)
            .setDescription(`Se eliminaron ${amount} mensajes`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete().catch(() => {}), 5000);
        });
    }
};