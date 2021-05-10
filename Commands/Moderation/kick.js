const Discord = require("discord.js");

module.exports = class KickCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "kick",
      aliases: [],
      description: "Expulsa a un miembro del servidor",
      usage: "kick <mention-member> (reason)",
      dirname: __dirname,
      date: "Lunes, 3 de mayo de 2021",
      botPermissions: 19458,
      userPermissions: 2,
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

      let perms = message.member.hasPermission("KICK_MEMBERS");
      if (!perms) {
        const embed = new Discord.MessageEmbed()
          .setDescription([
            `〔 ${client.emotes.error} 〕**No tienes el permiso necesario.**`,
            `〔 ${client.emotes.warning} 〕**Permiso Requerido:** \`KICK_MEMBERS\`**.**`,
          ])
          .setImage("https://i.imgur.com/9PlwvB4.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }

      if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription([
            `〔 ${client.emotes.error} 〕**No tengo el permiso necesario.**`,
            `〔 ${client.emotes.warning} 〕**Permiso Requerido:** \`KICK_MEMBERS\`**.**`,
          ])
          .setImage("https://i.imgur.com/9PlwvB4.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }

      if (!user)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes mencionar o darme la ID de un miembro del servidor.**`
        );

      if (user.id === message.author.id)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No puedes expulsarte a ti mismo.**`
        );

      if (user.id === client.user.id)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No puedo autoexpulsarme.**`
        );

      if (
        message.guild.ownerID !== message.author.id &&
        user.roles.highest.comparePositionTo(message.member.roles.highest) >= 0
      )
        return message.reply(
          `〔 ${client.emotes.error} 〕**Basándome en la jerarquía de roles, no puedes expulsar a ese miembro.**`
        );

      if (razon.length > 101)
        return message.reply(
          `〔 ${client.emotes.error} 〕**La razón no puede superar los 100 caracteres.**`
        );

      if (!message.guild.member(user).kickable)
        return message.reply(
          `〔 ${client.emotes.error} 〕**El miembro mencionado no puedo expulsarlo.**`
        );
      client.modlogs(
        {
          Member: user,
          Action: "Kick",
          Reason: razon,
          Color: "#FF8700",
        },
        message
      );
      message.reply(
        `〔 ${client.emotes.success} 〕**El usuario:** \`${user.user.tag}\` **fue expulsado exitosamente.**`
      );
      await message.guild.member(user).kick({ reason: razon });
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
