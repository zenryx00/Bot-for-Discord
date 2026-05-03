const log = require('../Utils/modlog');

module.exports = {
    name: 'roleUpdate',

    async execute(oldRole, newRole) {

        let changes = [];

        if (oldRole.name !== newRole.name) {
            changes.push(`Nombre: ${oldRole.name} → ${newRole.name}`);
        }

        if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
            changes.push('Permisos modificados');
        }

        if (oldRole.color !== newRole.color) {
            changes.push('Color cambiado');
        }

        if (changes.length === 0) return;

        await log(oldRole.guild, {
            title: '⚙️ Rol actualizado',
            color: 0xffcc00,
            content: changes.join('\n')
        });
    }
};