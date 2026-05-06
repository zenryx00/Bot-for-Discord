const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'iq',

    async execute(message) {

        const user = message.mentions.users.first() || message.author;

        const iq = Math.floor(Math.random() * 161);

        let nivel = '';

        if (iq < 70) nivel = 'Bajo';
        else if (iq < 100) nivel = 'Normal';
        else if (iq < 130) nivel = 'Alto';
        else nivel = 'Muy alto <:Omg:1501396849532342495>';

        const embed = new EmbedBuilder()
            .setTitle('🧠 IQ Test')
            .setColor(0xffcc00)
            .addFields(
                { name: 'Usuario', value: `${user}` },
                { name: 'IQ', value: `${iq}` },
                { name: 'Nivel', value: nivel }
            )
            .setFooter({ text: `Solicitado por ${message.author.username}` })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};