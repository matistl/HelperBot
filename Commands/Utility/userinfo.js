const Discord = require("discord.js");

module.exports = class NameCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "userinfo",
      aliases: ["user", "ui"],
      description: "Da la información de un usuario en el servidor",
      usage: "userinfo (mention)",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 5,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      let user = args[0]
        ? message.mentions.members.first() ||
          message.guild.members.cache.find((e) =>
            e.user.username.match(new RegExp(`${args[0]}`, "gi"))
          ) ||
          message.guild.members.cache.get(args[0]) ||
          message.member
        : message.member;

      let badges1 = {
        BUGHUNTER_LEVEL_1: "<:bug_hunter_badge:767200588231344128>",
        BUGHUNTER_LEVEL_2: "<:bughunterlvl2:784154198219685899>",
        VERIFIED_DEVELOPER: "<a:botdevolper:773249213109633034>",
        EARLY_VERIFIED_DEVELOPER: "<:developer:778943805138665514>",
        HOUSE_BRILLIANCE: "<:brilliance_badge:767201442531770378>",
        HOUSE_BRAVERY: "<:bravery_badge:767201411791978507>",
        HOUSE_BALANCE: "<:balance_badge:767201464585945130>",
        VERIFIED_BOT: "<:botverify:773244892708470814>",
        DISCORD_PARTNER: "<:partner_badge:767203723277369384>",
        HYPESQUAD_EVENTS: "<a:hypesquad_events:787442653717069856>",
        DISCORD_EMPLOYEE: "<:staff_badge:767200534603497482>",
        EARLY_SUPPORTER: "<:earlysupport:784154535517618266>",
      };
      function Markdown(str) {
        return `\`\`\`ml\n${str}\n\`\`\``;
      }

      function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return "Hace " + days + (days == 1 ? " día" : " días");
      }

      const rolesxd = user.roles.cache
        .filter((x) => x.id !== message.guild.id)
        .map((x) => `${x}`);
      const listaRoles =
        rolesxd.length > 10
          ? `${rolesxd.slice(0, 10).join(", ")} y **${
              rolesxd.length - 10
            }** roles más`
          : rolesxd.join(", ");
      const embed = new Discord.MessageEmbed()
        .setTitle(`__**Información de ${user.user.username}**__`)
        .setColor(
          user.roles.color
            ? user.roles.color.hexColor
            : client.colores.limeColor
        )
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .addField(`**Información del usuario:**`, [
          `**\`Tag:\`** ${user.user.tag}`,
          `**\`ID:\`**  ${user.user.id}`,
          `**\`Mención:\`** <@!${user.user.id}>`,
          `**\`Creación de la cuenta:\`** ${user.user.createdAt
            .toUTCString()
            .substr(0, 16)} (${checkDays(user.user.createdAt)})`,
        ])
        .addField("**Información del usuario en el servidor:**", [
          `**\`Fecha de entrada:\`** ${user.joinedAt
            .toUTCString()
            .substr(0, 16)} (${checkDays(user.joinedAt)})`,
          `**\`Color Hex:\`** ${user.displayHexColor || "No hay color"}`,
          `**\`Nickname:\`** ${user.nickname || "No tiene nickname"}`,
        ])
        .addField(`**Roles del miembro:**`, [
          `**\`Rol más alto:\`** ${user.roles.highest || "No tiene roles"}`,
          `**\`Rol de color:\`** ${user.roles.color || "No hay rol con color"}`,
          `**\`Roles totales:\`** ${listaRoles || "No tiene roles"}`,
        ])
        .addField(
          "**Permisos del miembro en el servidor:**",
          Markdown(user.permissions.toArray().join(", "))
        );

      await message.channel.send(embed);
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
