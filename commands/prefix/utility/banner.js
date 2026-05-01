const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'banner',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [{ title: '❌ Error', description: msg, color: 0xff0000 }]
        });

        const user =
            message.mentions.users.first() ||
            await message.client.users.fetch(args[0]).catch(() => null) ||
            message.author;

        await user.fetch();

        const banner = user.bannerURL({ size: 1024, dynamic: true });

        if (!banner) {
            return message.reply(error('Este usuario no tiene banner.'));
        }

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`🖼 Banner de ${user.username}`)
                    .setImage(banner)
                    .setColor(0x5865f2)
            ]
        });
    }
};