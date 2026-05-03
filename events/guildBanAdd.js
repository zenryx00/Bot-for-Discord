const log = require('../Utils/modlog');

module.exports = {
    name: 'guildBanAdd',

    async execute(ban) {

        await log(ban.guild, {
            title: '🔨 Usuario baneado',
            color: 0xff0000,
            user: ban.user,
            content: 'Ban detectado desde Discord (no comando)'
        });
    }
};