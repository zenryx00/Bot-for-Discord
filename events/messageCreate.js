const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { askAI } = require(".Perukistan/utils/aiManager");

// 📂 cargar JSON
const configPath = path.resolve(__dirname, "..", "Data", "ai_config.json");
let aiConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// 🧠 memoria por usuario
const memory = new Map();

const API_KEY = "AIzaSyD_lGf0uFiv4Iv0O1S4T_aIWxpdR45yJc8";

// 🔄 obtener config del servidor
function getConfig(guildId) {
    return aiConfig.servers[guildId] || aiConfig.default;
}

// 🤖 IA
async function askAI(userId, guildId, prompt) {
    try {
        let history = memory.get(userId) || [];
        const serverConfig = getConfig(guildId);

        // 🎭 personalidad + reglas (solo al inicio)
        if (!history.length) {
            history.push({
                role: "user",
                text: `
${serverConfig.personality}

Reglas importantes:
${serverConfig.rules}
`
            });
        }

        history.push({ role: "user", text: prompt });

        const contents = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=AIzaSyD_lGf0uFiv4Iv0O1S4T_aIWxpdR45yJc8`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ contents })
            }
        );

        const data = await res.json();

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) return "⚠️ No pude responder eso";

        history.push({ role: "model", text: reply });

        if (history.length > 10) history.shift();

        memory.set(userId, history);

        return reply;

    } catch (err) {
        console.error(err);
        return "💥 Error con la IA";
    }
}

module.exports = (client) => {
    client.on("messageCreate", async (message) => {

        if (message.author.bot) return;
        if (!message.guild) return;

        const botId = client.user.id;
        const mentioned = message.mentions.has(botId);

        // ❌ si no lo mencionan → ignorar
        if (!mentioned) return;

        // ✂️ quitar mención
        const content = message.content
            .replace(`<@${botId}>`, "")
            .replace(`<@!${botId}>`, "")
            .trim();

        // ❌ solo mención → ignorar
        if (!content.length) return;

        await message.channel.sendTyping();

        const response = await askAI(
            message.author.id,
            message.guild.id,
            content
        );

        message.reply(response);
    });
};