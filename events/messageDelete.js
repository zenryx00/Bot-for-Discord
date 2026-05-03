const log = require('../Utils/modlog');

module.exports = {
    name: 'messageDelete',

    async execute(message) {

        if (!message.guild) return;

        await log(message.guild, {
            title: '🗑️ Mensaje eliminado',
            color: 0xff5555,
            user: message.author,
            content: message.content || 'Sin contenido'
        });
    }
};