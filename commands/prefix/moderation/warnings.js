const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'warnings',

    async execute(message, args) {

        const error = (msg) => ({
            embeds: [
                new EmbedBuilder()
                    .setTitle('❌ Error')
                    .setDescription(msg)
                    .setColor(0xff0000)
            ]
        });

        const user =
            message.mentions.users.first() ||
            await message.client.users.fetch(args[0]).catch(() => message.author);

        const path = './Data/warns.json';

        let data = {};
        if (fs.existsSync(path)) {
            data = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        const warns = data[user.id];

        if (!warns || warns.length === 0) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('📄 Warnings')
                        .setDescription('Este usuario no tiene warns.')
                        .setColor(0x00ff99)
                ]
            });
        }

        const list = warns.map((w, i) =>
            `**${i + 1}.** ${w.reason}\n👮 Staff: <@${w.staff}>\n📅 <t:${Math.floor(new Date(w.date).getTime() / 1000)}:F>`
        ).join('\n\n');

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`📄 Warns de ${user.tag}`)
                    .setDescription(list)
                    .setColor(0xffcc00)
            ]
        });
    }
};