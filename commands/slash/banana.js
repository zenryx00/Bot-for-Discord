const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banana')
        .setDescription('Mide el tamaño de la banana 🍌')
        .addUserOption(opt =>
            opt.setName('user')
                .setDescription('Usuario a medir')
        ),

    async execute(interaction) {

        try {

            const target = interaction.options.getUser('user') || interaction.user;

            const size = Math.floor(Math.random() * 31);

            let comment;

            if (size === 0) comment = 'Desapareció… 😔';
            else if (size <= 5) comment = 'Pequeña pero con actitud 😎';
            else if (size <= 10) comment = 'Promedio 👀';
            else if (size <= 20) comment = 'Respetable 😳';
            else if (size <= 25) comment = 'Grande ⚠️';
            else comment = 'Nivel legendario 🗿🍌';

            let gif = null;

            // 🌸 API 1
            try {
                const res = await fetch('https://api.waifu.pics/sfw/neko');
                const data = await res.json();
                if (data?.url) gif = data.url;
            } catch {}

            // 🌸 API 2 (fallback)
            if (!gif) {
                try {
                    const res = await fetch('https://nekos.best/api/v2/neko');
                    const data = await res.json();
                    gif = data.results?.[0]?.url;
                } catch {}
            }

            const embed = new EmbedBuilder()
                .setTitle('🍌 Medidor de Banana')
                .setColor(0xFFD700)
                .setDescription(
                    `**${target.username}** tiene una banana de:\n\n🍌 **${size} cm**\n\n${comment}`
                )
                .setFooter({ text: `Solicitado por ${interaction.user.username}` })
                .setTimestamp();

            if (gif) {
                embed.setImage(gif);
                return interaction.reply({ embeds: [embed] });
            }

            // fallback sin archivo local (más seguro en slash)
            return interaction.reply({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error banana slash:', err);

            return interaction.reply({
                content: '❌ Error ejecutando el comando.',
                ephemeral: true
            });
        }
    }
};