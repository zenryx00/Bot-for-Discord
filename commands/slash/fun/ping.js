const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Muestra la latencia del bot'),

    async execute(interaction, client) {

        try {

            // 🏓 mensaje inicial (para medir latencia real)
            const sent = await interaction.reply({
                content: '🏓 Calculando ping...',
                fetchReply: true
            });

            const latency = sent.createdTimestamp - interaction.createdTimestamp;
            const apiPing = client.ws.ping;

            const embed = new EmbedBuilder()
                .setTitle('🏓 Pong!')
                .setColor(0x00ffcc)
                .addFields(
                    { name: '📡 Latencia', value: `${latency}ms`, inline: true },
                    { name: '🤖 API', value: `${apiPing}ms`, inline: true }
                )
                .setTimestamp();

            return interaction.editReply({
                content: null,
                embeds: [embed]
            });

        } catch (err) {
            console.log('❌ Error ping:', err);

            if (interaction.replied || interaction.deferred) {
                return interaction.followUp({
                    content: '❌ Error ejecutando ping',
                    ephemeral: true
                });
            }

            return interaction.reply({
                content: '❌ Error ejecutando ping',
                ephemeral: true
            });
        }
    }
};