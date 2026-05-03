module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {

        try {

            // 🚫 Solo slash commands
            if (!interaction.isChatInputCommand()) return;

            // 🔎 buscar comando
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                return interaction.reply({
                    content: '❌ Este comando no existe o no está cargado.',
                    ephemeral: true
                });
            }

            // ⚡ ejecutar con manejo de timeout básico (evita congelamientos)
            const result = await Promise.race([
                command.execute(interaction, client),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout Slash Command')), 10000)
                )
            ]);

            return result;

        } catch (err) {

            console.log('❌ Error en interactionCreate:', err);

            try {

                // ⚠️ si ya respondió
                if (interaction.replied || interaction.deferred) {
                    return await interaction.followUp({
                        content: '❌ Error ejecutando el comando.',
                        ephemeral: true
                    });
                }

                // ⚠️ primera respuesta
                return await interaction.reply({
                    content: '❌ Error ejecutando el comando.',
                    ephemeral: true
                });

            } catch (e) {
                console.log('❌ Error enviando respuesta de error:', e);
            }
        }
    }
};