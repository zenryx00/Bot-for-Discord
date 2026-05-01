const fs = require('fs');

const path = './Data/bans.json';

function load() {
    if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
    return JSON.parse(fs.readFileSync(path));
}

function save(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function addBan(userId, data) {
    const bans = load();
    bans[userId] = data;
    save(bans);
}

function removeBan(userId) {
    const bans = load();
    delete bans[userId];
    save(bans);
}

function getBans() {
    return load();
}

module.exports = {
    addBan,
    removeBan,
    getBans
};