const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// 📂 raíz del proyecto
const filePath = path.join(process.cwd(), 'Data', 'guilds.json');

module.exports = {
    name: 'setlogs',

    async execute(message, args) {

        try {

            // 🔒 permisos
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return message.reply('❌ Necesitas ser administrador.');
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

            // 🧠 asegurar servidor
            if (!db[message.guild.id]) {
                db[message.guild.id] = {};
            }

            // 🔁 siempre reemplaza el anterior
            db[message.guild.id].modlogChannel = channel.id;

            // 💾 guardar
            fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

            // ✅ embed confirmación
            const embed = new EmbedBuilder()
                .setTitle('📊 Mod-Logs configurados')
                .setDescription(`Canal de logs actualizado a ${channel}\n\n⚠️ El anterior fue reemplazado`)
                .setColor(0x00ff00)
                .setTimestamp();

            return message.reply({ embeds: [embed] });

        } catch (err) {
            console.log('❌ Error setlogs:', err);
            return message.reply('❌ Error configurando logs.');
        }
    }
};