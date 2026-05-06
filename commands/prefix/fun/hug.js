const { 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle 
} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'hug',

    async execute(message, args) {

        try {

            const targetUser = message.mentions.users.first();
            const targetMember = message.mentions.members.first();

            // 👤 Nombres con nickname
            const authorName = message.member?.displayName || message.author.username;
            const targetName = targetMember?.displayName || targetUser?.username || 'al aire';

            let gif = null;

            // 🌸 API 1
            try {
                const res = await fetch('https://api.waifu.pics/sfw/hug');
                const data = await res.json();
                if (data && data.url) gif = data.url;
            } catch {}

            // 🌸 API 2
            if (!gif) {
                try {
                    const res = await fetch('https://nekos.best/api/v2/hug');
                    const data = await res.json();
                    if (data && data.results && data.results[0]) {
                        gif = data.results[0].url;
                    }
                } catch {}
            }

            if (!gif) {
                return message.reply('❌ No se pudo obtener un gif.');
            }

            const embed = new EmbedBuilder()
                .setTitle(`${authorName} abrazo a ${targetName}`)
                .setColor(0x162659)
                .setImage(gif)
                .setFooter({ text: `Solicitado por ${authorName}` })
                .setTimestamp();

            // 🎯 Botón devolver
            let components = [];

            if (targetUser && targetUser.id !== message.author.id) {
                const button = new ButtonBuilder()
                    .setCustomId(`return_kiss_${message.author.id}_${targetUser.id}`)
                    .setLabel('Devolver abrazo')
                    .setStyle(ButtonStyle.Primary);

                const row = new ActionRowBuilder().addComponents(button);
                components.push(row);
            }

            return message.reply({
                embeds: [embed],
                components
            });

        } catch (err) {
            console.log('❌ Error hug:', err);
            return message.reply('❌ Error ejecutando el comando.');
        }
    }
};