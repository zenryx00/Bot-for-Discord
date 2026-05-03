const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'petpet',

    async execute(message, args) {

        const user =
            message.mentions.users.first() ||
            message.author;

        const avatar = user.displayAvatarURL({
            extension: 'png',
            size: 256
        });

        // 🐾 GIF ya hecho (mano petpet)
        const gif = 'https://media.tenor.com/8QfQh5Xg0Q0AAAAC/pat-headpat.gif';

        const embed = new EmbedBuilder()
            .setColor(0xffc0cb)
            .setTitle('🐾 PetPet')
            .setDescription(
                `**${message.author.username}** acaricia a **${user.username}** 🥺`
            )
            .setImage(gif)
            .setThumbnail(avatar)
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }
};