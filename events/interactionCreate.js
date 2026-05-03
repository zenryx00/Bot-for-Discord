module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        try {

            // 🚫 Ignorar si no es slash command
            if (!interaction.isChatInputCommand()) return;

            // 🔎 buscar comando
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                return interaction.reply({
                    content: '❌ Este comando no existe o no está cargado.',
                    ephemeral: true
                });
            }

            // ⚙️ ejecutar comando
            await command.execute(interaction, client);

        } catch (err) {
            console.log('❌ Error en interactionCreate:', err);

            // ⚠️ evitar crash de Discord
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: '❌ Error ejecutando el comando.',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '❌ Error ejecutando el comando.',
                    ephemeral: true
                });
            }
        }
    }
};