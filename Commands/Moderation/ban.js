const Discord = require("discord.js");

module.exports = class BanCommand extends require("../../Class/Command") {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: [],
            description: "Prohíbe el ingreso de un usuario al servidor",
            usage: "ban <mention-member> (reason)",
            dirname: __dirname,
            date: "Lunes, 3 de mayo de 2021",
            botPermissions: 19460,
            userPermissions: 4,
            cooldown: 5,
            nsfw: false,
            args: true,
            dev: false,
            enable: true,
        });
    }
    async run(message, args) {
        const client = this.client;
        try {
            let user =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]);
            let razon = args.slice(1).join(" ") || "No hay razón.";

            let perms = message.member.hasPermission("BAN_MEMBERS");
            if (!perms) {
                const embed = new Discord.MessageEmbed()
                    .setDescription([
                        `〔 ${client.emotes.error} 〕**No tienes el permiso necesario.**`,
                        `〔 ${client.emotes.warning} 〕**Permiso Requerido:** \`BAN_MEMBERS\`**.**`,
                    ])
                    .setImage("https://i.imgur.com/EsnNDW4.gif")
                    .setColor(client.colores.redColor);
                return message.reply(embed);
            }

            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                const embed = new Discord.MessageEmbed()
                    .setDescription([
                        `〔 ${client.emotes.error} 〕**No tengo el permiso necesario.**`,
                        `〔 ${client.emotes.warning} 〕**Permiso Requerido:** \`BAN_MEMBERS\`**.**`,
                    ])
                    .setImage("https://i.imgur.com/EsnNDW4.gif")
                    .setColor(client.colores.redColor);
                return message.reply(embed);
            }

            if (!user)
                return message.reply(
                    `〔 ${client.emotes.error} 〕**Debes mencionar o darme la ID de un miembro del servidor.**`
                );

            if (user.id === message.author.id)
                return message.reply(
                    `〔 ${client.emotes.error} 〕**No puedes banearte a ti mismo.**`
                );

            if (user.id === client.user.id)
                return message.reply(
                    `〔 ${client.emotes.error} 〕**No puedo autobanearme.**`
                );

            if (
                message.guild.ownerID !== message.author.id &&
                user.roles.highest.comparePositionTo(message.member.roles.highest) >= 0
            )
                return message.reply(
                    `〔 ${client.emotes.error} 〕**Basándome en la jerarquía de roles, no puedes banear a ese miembro.**`
                );

            if (razon.length > 101)
                return message.reply(
                    `〔 ${client.emotes.error} 〕**La razón no puede superar los 100 caracteres.**`
                );

            if (!message.guild.member(user).bannable)
                return message.reply(
                    `〔 ${client.emotes.error} 〕**El miembro mencionado no puedo banearlo.**`
                );
            client.modlogs(
                {
                    Member: user,
                    Action: "Ban",
                    Reason: razon,
                    Color: client.colores.redColor,
                },
                message
            );
            message.reply(
                `〔 ${client.emotes.success} 〕**El usuario:** \`${user.user.tag}\` **fue baneado exitosamente.**`
            );
            await message.guild.members.ban(user, { reason: razon });
        } catch (e) {
            client.error({
                name: this.information.name,
                error: e,
                type: "command",
                message,
            });
        }
    }
};
