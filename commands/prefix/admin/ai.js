const { EmbedBuilder } = require('discord.js');

// ⏳ cooldown
const cooldowns = new Map();

// 🧠 fake fallback AI (por si no hay API)
function fallbackAI(prompt) {
    const responses = [
        "🤔 Interesante... pero no tengo suficiente info para eso.",
        "😎 Suena bien, pero depende del contexto.",
        "💡 Buena pregunta bro, podría ser una posibilidad.",
        "🧠 No estoy seguro, pero investigaría más eso."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

// 🔥 (opcional) aquí puedes meter OpenAI o Gemini después
async function askAI(prompt) {
    try {
        // 👉 AQUÍ IRÍA TU API REAL (OpenAI / Gemini / HF)

        // return await realAPI(prompt);

        return fallbackAI(prompt);

    } catch (err) {
        return fallbackAI(prompt);
    }
}

module.exports = {
    name: 'ai',

    async execute(message, args) {

        const userId = message.author.id;

        // ❌ sin texto
        if (!args.length) {
            return message.reply('❌ Usa: `-ai <pregunta>`');
        }

        const prompt = args.join(' ');

        // ⏳ cooldown 5s anti spam
        const now = Date.now();
        const cooldown = 5000;

        if (cooldowns.has(userId)) {
            const expire = cooldowns.get(userId) + cooldown;

            if (now < expire) {
                const timeLeft = Math.ceil((expire - now) / 1000);
                return message.reply(`⏳ Espera ${timeLeft}s antes de volver a usar AI`);
            }
        }

        cooldowns.set(userId, now);

        // 🧠 respuesta AI
        const response = await askAI(prompt);

        // ✂️ límite de seguridad
        const finalResponse = response.length > 4096
            ? response.slice(0, 4090) + "..."
            : response;

        const embed = new EmbedBuilder()
            .setTitle('🤖 AI Assistant')
            .setColor(0x5865F2)
            .addFields(
                { name: '🧑 Tú', value: prompt },
                { name: '🤖 Respuesta', value: finalResponse }
            )
            .setFooter({ text: 'AI Mode • beta version' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};