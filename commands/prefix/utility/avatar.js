const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'avatar',

    async execute(message) {

        const user = message.mentions.users.first() || message.author;

        const avatarURL = user.displayAvatarURL({ size: 1024, dynamic: true });

        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Avatar de ${user.username}`)
            .setImage(avatarURL)
            .setColor(0x00ff99)
            .setFooter({ text: 'Haz click para abrir en el navegador' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Abrir avatar')
                .setStyle(ButtonStyle.Link)
                .setURL(avatarURL)
        );

        message.reply({ embeds: [embed], components: [row] });
    }
};