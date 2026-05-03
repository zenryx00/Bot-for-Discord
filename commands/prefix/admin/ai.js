const fetch = require("node-fetch");

async function askAI(prompt) {
    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=TU_API_KEY`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: "Responde como un bot de Discord, claro y no muy largo." },
                                { text: prompt }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await res.json();

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) return fallbackAI(prompt);

        return text;

    } catch (err) {
        console.error("AI Error:", err);
        return fallbackAI(prompt);
    }
}