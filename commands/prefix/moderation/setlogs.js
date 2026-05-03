const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../Data/guilds.json');

module.exports = {
    name: 'setlogs',

    async execute(message, args) {

        try {

            // 🔒 permiso admin
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return message.reply('❌ Necesitas permisos de administrador.');
            }

            const channel = message.mentions.channels.first();

            if (!channel) {
                return message.reply('❌ Menciona un canal válido.');
            }

            // 📂 leer DB
            let db = {};

            if (fs.existsSync(filePath)) {
                db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }

            // 🧠 crear guild si no existe
            if (!db[message.guild.id]) {
                db[message.guild.id] = {};
            }

            // 💾 guardar canal
            db[message.guild.id].modlogChannel = channel.id;

            fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

            // ✅ confirmación embed
            const embed = new EmbedBuilder()
                .setTitle('📊 Logs configurados')
                .setDescription(`Canal de logs establecido en ${channel}`)
                .setColor(0x00ff00)
                .setTimestamp();

            return message.reply({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error setlogs:', err);
            return message.reply('❌ Error configurando los logs.');
        }
    }
};