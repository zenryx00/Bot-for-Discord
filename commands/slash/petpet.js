const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('petpet')
        .setDescription('Headpat a alguien 🥺')
        .addUserOption(opt =>
            opt.setName('user')
                .setDescription('Usuario')
                .setRequired(true)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('user');

        let gif;

        try {
            const res = await fetch('https://api.waifu.pics/sfw/pat');
            const data = await res.json();
            gif = data.url;
        } catch {}

        return interaction.reply({
            content: `🥺 ${interaction.user} le dio headpat a ${user}`,
            files: gif ? [gif] : []
        });
    }
};