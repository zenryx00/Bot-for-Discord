const log = require('../Utils/modlog');

module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {

        await log(member.guild, {
            title: '➕ Usuario entró',
            color: 0x00ff00,
            fields: [
                { name: 'Usuario', value: member.user.tag }
            ]
        });
    }
};