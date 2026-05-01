const { EmbedBuilder } = require('discord.js');

const facts = {
    ciencia: [
        "El pulpo tiene 3 corazones 🐙",
        "Un rayo puede calentar el aire a 30,000°C ⚡",
        "La luz del Sol tarda ~8 minutos en llegar a la Tierra ☀️",
        "El cerebro humano consume ~20% de la energía del cuerpo 🧠"
    ],
    animales: [
        "Los gatos no pueden saborear lo dulce 😺",
        "Las vacas tienen mejores amigas 🐄",
        "Los pulpos tienen sangre azul 🐙",
        "Los elefantes no pueden saltar 🐘"
    ],
    espacio: [
        "Un día en Venus es más largo que su año 🌌",
        "En Marte el cielo puede verse azul al atardecer 🔵",
        "Hay más estrellas en el universo que granos de arena en la Tierra ✨"
    ],
    random: [
        "Los humanos comparten 60% de ADN con los plátanos 🍌",
        "Tu estómago produce una nueva capa de moco cada 2 semanas 🤯",
        "Parpadear es más rápido que pensar 👁️"
    ]
};

module.exports = {
    name: 'fact',

    async execute(message, args) {

        const category = args[0]?.toLowerCase();

        const keys = Object.keys(facts);
        const chosenCategory = keys.includes(category) ? category : 'random';

        const factList = facts[chosenCategory];
        const fact = factList[Math.floor(Math.random() * factList.length)];

        const embed = new EmbedBuilder()
            .setTitle('🧠 Dato curioso')
            .setColor(0xffcc00)
            .setDescription(fact)
            .addFields(
                { name: '📂 Categoría', value: chosenCategory, inline: true }
            )
            .setFooter({ text: 'Usa -fact ciencia/animales/espacio' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};