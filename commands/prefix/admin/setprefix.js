const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'setprefix',

    async execute(message, args) {

        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ No tienes permisos para usar esto.');
        }

        const newPrefix = args[0];

        if (!newPrefix) {
            return message.reply('❌ Usa: `!setprefix <nuevo prefijo>`');
        }

        try {
            const configPath = './Data/config.json';
            const config = require('../../Data/config.json');

            config.prefix = newPrefix;

            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

            const embed = new EmbedBuilder()
                .setTitle('⚙️ Prefijo actualizado')
                .setColor(0x00ff99)
                .addFields(
                    { name: '📌 Nuevo prefijo', value: `\`${newPrefix}\``, inline: true }
                )
                .setFooter({ text: 'El cambio es permanente' })
                .setTimestamp();

            message.reply({ embeds: [embed] });

        } catch (err) {
            console.log(err);

            const embed = new EmbedBuilder()
                .setTitle('❌ Error')
                .setColor(0xff0000)
                .setDescription('No se pudo cambiar el prefijo');

            message.reply({ embeds: [embed] });
        }
    }
};