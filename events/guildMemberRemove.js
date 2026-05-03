const log = require('../Utils/modlog');

module.exports = {
    name: 'guildMemberRemove',

    async execute(member) {

        await log(member.guild, {
            title: '➖ Usuario salió',
            color: 0xff0000,
            user: member.user
        });
    }
};