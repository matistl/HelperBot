const Discord = require("discord.js");
const db = require("../../Util/Models/warns.js");

module.exports = class WarnCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "warn",
      aliases: [],
      description: "Advierte a un miembro del servidor",
      usage: "warn <mention-member> (reason)",
      dirname: __dirname,
      date: "Martes, 4 de mayo de 2021",
      botPermissions: 19456,
      userPermissions: 8192,
      cooldown: 4,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const permisosUser = message.member.permissions.has("MANAGE_MESSAGES");
      const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      const razon = args.slice(1).join(" ") || "No hay razón.";
      if (!permisosUser) {
        const embed = new Discord.MessageEmbed()
          .setDescription([
            `${client.emotes.error} | **No tienes el permiso necesario.**`,
            `${client.emotes.warning} | **Permiso Requerido:** \`MANAGE_MESSAGES\`**.**`,
          ])
          .setColor(client.colores.redColor)
          .setImage("https://i.imgur.com/HKqT9sy.gif");
        return message.reply(embed);
      }
      if (!user)
        return message.reply(
          `${client.emotes.error} | **Debes mencionar o darme la ID de un miembro del servidor.**`
        );
      if (user.id === message.author.id)
        return message.reply(
          `${client.emotes.error} | **No puedes advertirte a ti mismo.**`
        );

      if (user.id === client.user.id)
        return message.reply(
          `${client.emotes.error} | **No puedo auto advertirme.**`
        );

      if (
        message.guild.ownerID !== message.author.id &&
        user.roles.highest.comparePositionTo(message.member.roles.highest) >= 0
      )
        return message.reply(
          `${client.emotes.error} | **Basándome en la jerarquía de roles, no puedes advertir a ese miembro.**`
        );
      if (razon.length > 101)
        return message.reply(
          `${client.emotes.error} | **La razón nu puede superar los 100 caracteres.**`
        );

      await db.findOne(
        { guildID: message.guild.id, userID: user.user.id },
        async (err, data) => {
          if (err) throw err;
          if (!data) {
            const popo = new db({
              guildID: message.guild.id,
              userID: user.user.id,
              content: [
                {
                  author: message.author.id,
                  reason: razon,
                  date: new Date().toLocaleString("en-US", {
                    timeZone: "America/Merida",
                  }),
                },
              ],
            });
            await popo.save();
          } else {
            data.content.push({
              author: message.author.id,
              reason: razon,
              date: new Date().toLocaleString("en-US", {
                timeZone: "America/Merida",
              }),
            });
            await data.save();
          }
        }
      );
      client.modlogs(
        {
          Member: user,
          Action: "Warn",
          Reason: razon,
          Color: client.colores.yellowColor,
        },
        message
      );
      message.reply(
        `${client.emotes.success} | **El miembro:** \`${user.user.tag}\` **fue advertido correctamente.**`
      );
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
