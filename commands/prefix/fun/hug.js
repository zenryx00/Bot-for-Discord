const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'hug',

    async execute(message) {

        const target = message.mentions.users.first();

        if (!target) {
            return message.reply('❌ Debes mencionar a alguien.');
        }

        const embed = new EmbedBuilder()
            .setTitle('🤗 Abrazo recibido')
            .setDescription(`${message.author} abrazó a ${target}`)
            .setColor(0xff69b4);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`return_hug_${message.author.id}_${target.id}`)
                .setLabel('Devolver abrazo 🤗')
                .setStyle(ButtonStyle.Success)
        );

        const msg = await message.reply({
            embeds: [embed],
            components: [row]
        });

        const collector = msg.createMessageComponentCollector({ time: 30000 });

        collector.on('collect', async i => {

            if (i.customId !== `return_hug_${message.author.id}_${target.id}`) return;

            if (i.user.id !== target.id) {
                return i.reply({
                    content: '❌ Solo la persona mencionada puede devolver el abrazo.',
                    ephemeral: true
                });
            }

            await i.reply({ content: '🤗 Abrazo devuelto!', ephemeral: true });

            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('💞 Abrazo recíproco')
                        .setDescription(`${target} devolvió el abrazo a ${message.author}`)
                        .setColor(0xff69b4)
                ]
            });

            collector.stop();
        });
    }
};