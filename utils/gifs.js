async function getActionGif(endpoint, fallback) {
    try {
        const res = await fetch(`https://api.waifu.pics/sfw/${endpoint}`);

        if (res.ok) {
            const data = await res.json();
            if (data?.url) return data.url;
        }

    } catch {
        // silencioso
    }

    return fallback;
}


// 🐱 NEKO (API distinta)
async function getNekoGif() {
    try {
        const res = await fetch('https://api.nekos.life/api/v2/img/neko');

        if (res.ok) {
            const data = await res.json();
            if (data?.url) return data.url;
        }

    } catch {
        // fallback
    }

    return 'https://media.tenor.com/neko-fallback.gif';
}

module.exports = {
    getActionGif,
    getNekoGif
};