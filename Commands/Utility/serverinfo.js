const Discord = require("discord.js");

module.exports = class ServerInfoCommand extends (
  require("../../Class/Command")
) {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      aliases: ["sv"],
      description: "Muestra información relevante acerca del servidor",
      usage: "serverinfo",
      dirname: __dirname,
      date: "Lunes, 26 de abril de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 4,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      let verificationLevel = {
        NONE: "Ninguno",
        LOW: "Bajo",
        MEDIUM: "Mediano",
        HIGH: "(╯°□°）╯︵  ┻━┻",
        VERY_HIGH: "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻",
      };
      let region = {
        europe: ":flag_eu: Europa",
        brazil: ":flag_br: Brazil",
        "eu-central": ":flag_eu: Europa Central",
        singapore: ":flag_sg: Singapur",
        "us-central": ":flag_us: U.S. Central",
        sydney: ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. del Este",
        "us-south": ":flag_us: U.S. del Sur",
        "us-west": ":flag_us: U.S. del Oeste",
        "eu-west": ":flag_eu: Europa Oriental",
        "vip-us-east": ":flag_us: VIP U.S. del Este",
        london: ":flag_gb: Londres",
        amsterdam: ":flag_nl: Amsterdam",
        hong_kong: ":flag_hk: Hong Kong",
        russia: ":flag_ru: Rusia",
        south_africa: ":flag_za:  Sudáfrica",
      };
      let level = {
        0: "Ninguno",
        1: "Nivel 1",
        2: "Nivel 2",
        3: "Nivel 3",
      };
      let channels = message.guild.channels;
      let text = channels.cache.filter((r) => r.type === "text").size;
      let vc = channels.cache.filter((r) => r.type === "voice").size;
      let category = channels.cache.filter((r) => r.type === "category").size;

      const rolesxd = message.guild.roles.cache
        .filter((x) => x.id !== message.guild.id)
        .map((x) => `${x}`);
      const listaRoles =
        rolesxd.length > 12
          ? `${rolesxd.slice(0, 12).join(" | ")} y **${
              rolesxd.length - 10
            }** roles más`
          : rolesxd.join(" | ");

      const emojisxd = message.guild.emojis.cache
        .filter((x) => x.id !== message.guild.id)
        .map((x) => `${x}`);
      const listaEmojis =
        emojisxd.length > 12
          ? `${emojisxd.slice(0, 12).join(" | ")} y **${
              emojisxd.length - 10
            }** emojis más`
          : emojisxd.join(" | ");

      const rulesID = message.guild.rulesChannelID;
      let rules1;
      if (!rulesID) {
        rules1 = "No hay canal de reglas";
      } else {
        rules1 = `<#${rulesID}>`;
      }

      const afkID = message.guild.afkChannelID;
      const timeAFK = message.guild.afkTimeout;
      let afk1;
      if (!afkID) {
        afk1 = "No hay canal AFK";
      } else {
        afk1 = `<#${afkID}> (${timeAFK}ms)`;
      }

      var server = message.guild;
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTitle(`> **Información del servidor**`)
        .addField("> **Información General:**", [
          `**\`Nombre:\`** ${message.guild.name}`,
          `**\`ID:\`** ${message.guild.id}`,
          `**\`Dueño:\`** ${message.guild.owner.user.tag} \`${message.guild.owner.user.id}\``,
          `**\`Región:\`** ${region[message.guild.region]}`,
          `**\`Nivel de verificación:\`** ${
            verificationLevel[message.guild.verificationLevel]
          }`,
          `**\`Fecha de creación:\`** ${message.channel.guild.createdAt
            .toUTCString()
            .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`,
          `**\`Canal de reglas:\`** ${rules1}`,
          `**\`Canal AFK:\`** ${afk1}`,
        ])
        .addField("> **Estadisticas:**", [
          `**\`Usuarios:\`** ${message.guild.members.cache.size} \`Total\` | ${
            message.guild.members.cache.filter((member) => !member.user.bot)
              .size
          } \`Member\` | ${
            message.guild.members.cache.filter((member) => member.user.bot).size
          } \`Bot\``,
          `**\`Canales:\`** ${message.guild.channels.cache.size} \`Total\` | ${text} \`Text\` | ${vc} \`Voice\` | ${category} \`Category\``,
          `**\`Nivel de Boost:\`** ${level[server.premiumTier]}`,
          `**\`Número de Boost:\`** ${
            server.premiumSubscriptionCount || "No hay boosts"
          }`,
          `**\`Boosters:\`** ${
            message.guild.members.cache
              .filter((x) => x.premiumSince)
              .map((x) => x.user.tag)
              .join(" | ") || "No hay boosters"
          }`,
        ])
        .addField("> **Información de los emojis:**", [
          `**\`Número de emojis:\`** ${message.guild.emojis.cache.size}`,
          `**\`Emojis:\`** \n${listaEmojis}`,
        ])
        .addField("> **Información de los roles:**", [
          `**\`Número de Roles:\`** ${message.guild.roles.cache.size}`,
          `**\`Roles:\`** \n${listaRoles}`,
        ]);
      message.reply(embed);
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

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return "Hace " + days + (days == 1 ? " día" : " días");
}
