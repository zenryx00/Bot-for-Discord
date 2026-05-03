const fetch = require("node-fetch");

const API_KEY = process.env.API_KEY;

// ⚙️ CONFIG
const LIMIT_PER_MINUTE = 12; // seguro (por debajo del real)
const WINDOW = 60 * 1000;

// 📊 estado
let requests = [];
let blockedUntil = 0;

// 🧠 modelos
const MODELS = {
    smart: "gemini-2.5-flash",
    normal: "gemini-2.0-flash-lite",
    fallback: "gemini-2.0-flash-lite"
};

// limpiar requests viejos
function clean() {
    const now = Date.now();
    requests = requests.filter(t => now - t < WINDOW);
}

// detectar estado
function getState() {
    clean();

    if (Date.now() < blockedUntil) {
        return "blocked";
    }

    if (requests.length >= LIMIT_PER_MINUTE) {
        return "limit";
    }

    if (requests.length >= LIMIT_PER_MINUTE * 0.7) {
        return "warning";
    }

    return "ok";
}

// calcular tiempo restante
function getWaitTime() {
    const now = Date.now();
    const oldest = requests[0] || now;
    const diff = WINDOW - (now - oldest);
    return Math.ceil(diff / 1000);
}

// 🤖 función principal
async function askAI(prompt) {
    const state = getState();

    if (state === "blocked") {
        return `⏳ Estoy saturado, vuelve en unos segundos...`;
    }

    if (state === "limit") {
        const wait = getWaitTime();
        blockedUntil = Date.now() + wait * 1000;

        return `🚫 Límite alcanzado, vuelve en ${wait}s`;
    }

    // 🧠 elegir modelo
    let model = MODELS.normal;

    if (state === "ok" && prompt.length > 200) {
        model = MODELS.smart;
    }

    if (state === "warning") {
        model = MODELS.fallback;
    }

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`,
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
                    ],
                    generationConfig: {
                        maxOutputTokens: 200
                    }
                })
            }
        );

        const data = await res.json();

        // 🚨 error real de cuota
        if (!res.ok) {
            if (data.error?.status === "RESOURCE_EXHAUSTED") {
                blockedUntil = Date.now() + 60 * 1000;
                return "🚫 Estoy saturado ahora mismo, intenta en 1 minuto";
            }

            return "❌ Error con la IA";
        }

        // registrar request
        requests.push(Date.now());

        return data?.candidates?.[0]?.content?.parts?.[0]?.text
            || "⚠️ Sin respuesta";

    } catch (err) {
        console.error(err);
        return "💥 Error conectando con IA";
    }
}

module.exports = { askAI };