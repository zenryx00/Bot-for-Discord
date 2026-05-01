const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    name: 'status',

    async execute(message) {

        const client = message.client;

        // ⏱️ uptime
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor(uptime / 3600) % 24;
        const minutes = Math.floor(uptime / 60) % 60;
        const seconds = Math.floor(uptime % 60);

        // 💾 RAM
        const memUsed = process.memoryUsage().rss / 1024 / 1024;

        // 🌐 ping
        const wsPing = client.ws.ping;

        // 🧠 CPU info
        const cpu = os.cpus()[0].model;

        // 📊 cálculo de “salud del bot”
        let health = 100;

        if (wsPing > 300) health -= 40;
        else if (wsPing > 150) health -= 20;

        if (memUsed > 500) health -= 30;
        else if (memUsed > 300) health -= 15;

        if (uptime < 60) health -= 10;

        const healthText =
            health >= 80 ? '🟢 Excelente' :
            health >= 50 ? '🟡 Estable' :
            '🔴 Crítico';

        // 📈 estado global
        const status =
            wsPing < 150 ? '🟢 Fluido' :
            wsPing < 300 ? '🟡 Normal' :
            '🔴 Lento';

        const embed = new EmbedBuilder()
            .setTitle('📊 Dashboard del Bot')
            .setColor(health >= 80 ? 0x00ff00 : health >= 50 ? 0xffff00 : 0xff0000)
            .setThumbnail(client.user.displayAvatarURL())

            .addFields(
                { name: '⏱️ Uptime', value: `${days}d ${hours}h ${minutes}m ${seconds}s`, inline: true },
                { name: '📡 Ping', value: `${wsPing}ms`, inline: true },
                { name: '📶 Estado', value: status, inline: true },

                { name: '💾 RAM usada', value: `${memUsed.toFixed(2)} MB`, inline: true },
                { name: '👥 Servidores', value: `${client.guilds.cache.size}`, inline: true },
                { name: '👤 Usuarios', value: `${client.users.cache.size}`, inline: true },

                { name: '📦 Comandos', value: `${client.commands.size}`, inline: true },
                { name: '🖥️ CPU Host', value: cpu, inline: false },

                { name: '❤️ Salud del bot', value: `${health}% (${healthText})`, inline: false }
            )

            .setFooter({
                text: 'Dashboard en tiempo real • Sistema pro activado'
            })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};