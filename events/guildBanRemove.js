const log = require('../Utils/modlog');

module.exports = {
    name: 'guildBanRemove',

    async execute(ban) {

        await log(ban.guild, {
            title: '🔓 Usuario desbaneado',
            color: 0x00ffcc,
            user: ban.user
        });
    }
};