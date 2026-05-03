const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

// ⏳ cooldown
const cooldowns = new Map();

// 🧠 fallback AI (por si falla la API)
function fallbackAI(prompt) {
    const responses = [
        "🤔 Interesante... pero no tengo suficiente info para eso.",
        "😎 Suena bien, pero depende del contexto.",
        "💡 Buena pregunta bro, podría ser una posibilidad.",
        "🧠 No estoy seguro, pero investigaría más eso."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

// 🤖 IA REAL (Gemini)
async function askAI(prompt) {
    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=AIzaSyCPr1J4lQ8C2vt63pg8VM2P82IUXDL8sas`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            }
        );

        const data = await res.json();

        // 🔍 DEBUG REAL
        if (!res.ok) {
            console.error("API ERROR:", data);
            return `❌ ${data.error?.message || "Error desconocido"}`;
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error("SIN RESPUESTA:", data);
            return "⚠️ La IA no devolvió texto";
        }

        return text;

    } catch (err) {
        console.error("FETCH ERROR:", err);
        return "💥 Error conectando con la IA";
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

        // ✂️ límite de Discord (4096 chars en embed)
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
            .setFooter({ text: 'AI Mode • Gemini' })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};