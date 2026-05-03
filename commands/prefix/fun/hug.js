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

            const target = message.mentions.users.first();
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
                .setTitle(`${message.author.username} abraza a ${target ? target.username : 'al aire'}`)
                .setColor(0x162659)
                .setImage(gif)
                .setFooter({ text: `Solicitado por ${message.author.username}` })
                .setTimestamp();

            // 🎯 Botón devolver (solo si hay target)
            let components = [];

            if (target && target.id !== message.author.id) {
                const button = new ButtonBuilder()
                    .setCustomId(`return_hug_${message.author.id}_${target.id}`)
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