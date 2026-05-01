const fs = require('fs');
const path = './Data/warns.json';

function load() {
    if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
    return JSON.parse(fs.readFileSync(path));
}

function save(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function addWarn(userId, warn) {
    const data = load();

    if (!data[userId]) data[userId] = [];

    data[userId].push(warn);

    save(data);
    return data[userId];
}

function getWarns(userId) {
    const data = load();
    return data[userId] || [];
}

module.exports = { addWarn, getWarns };