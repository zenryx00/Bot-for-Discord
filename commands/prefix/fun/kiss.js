const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getActionGif } = require('../../utils/gifs.js');

module.exports = {
    name: 'kiss',

    async execute(message) {

        const target = message.mentions.users.first();
        if (!target) return message.reply('❌ Menciona a alguien.');

        const gif = await getActionGif('kiss', 'https://media.tenor.com/kiss.gif');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`return_kiss_${message.author.id}_${target.id}`)
                .setLabel('Devolver beso 💋')
                .setStyle(ButtonStyle.Danger)
        );

        const msg = await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('💋 Beso')
                    .setDescription(`${message.author} besó a ${target}`)
                    .setImage(gif)
                    .setColor(0xff4d6d)
            ],
            components: [row]
        });

        const collector = msg.createMessageComponentCollector({ time: 30000 });

        collector.on('collect', async i => {

            if (i.customId !== `return_kiss_${message.author.id}_${target.id}`) return;

            if (i.user.id !== target.id)
                return i.reply({ content: '❌ Solo el usuario mencionado puede responder.', ephemeral: true });

            await i.reply({ content: '💋 Beso devuelto!', ephemeral: true });

            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('💞 Beso recíproco')
                        .setDescription(`${target} devolvió el beso a ${message.author}`)
                        .setColor(0xff4d6d)
                ]
            });

            collector.stop();
        });
    }
};