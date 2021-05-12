const Discord = require("discord.js");
const humanizeDuration = require("humanize-duration");

module.exports = class ChannelInfoCommand extends (
  require("../../Class/Command")
) {
  constructor(client) {
    super(client, {
      name: "channelinfo",
      aliases: ["ci", "chinfo"],
      description: "Muestra la información más relevante de un canal",
      usage: "channelinfo (mention-channel)",
      dirname: __dirname,
      date: "Miércoles, 28 de abril de 2021",
      botPermissions: null,
      userPermissions: null,
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
      let type = {
        dm: "DM",
        text: "Canal Texto",
        voice: "Canal Voz",
        category: "Categoría",
        news: "Canal de noticias",
        store: "Tienda",
        unknown: "Canal desconocido",
      };
      const channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) || message.channel;
      if (!message.guild.channels.cache.has(channel.id))
        return message.reply(
          `${client.emotes.error} | **Menciona únicamente a canales del servidor.**`
        );
      const infoEmbed = new Discord.MessageEmbed()
        .setTitle("> **Información del canal**")
        .setColor(client.colores.yellowColor)
        .setDescription([
          `**\`Nombre:\`** ${channel.name}`,
          `**\`ID:\`** ${channel.id}`,
          `**\`Mención:\`** <#${channel.id}>`,
          `**\`Tipo:\`** ${type[channel.type]}`,
          `**\`Categoría:\`** ${
            channel.parent ? channel.parent.name : "No hay categoría"
          }`,
        ])
        .addField("> **Otra Información:**", [
          `**\`Número Posición:\`** ${channel.rawPosition}`,
          `**\`Cooldown:\`** ${humanizeDuration(
            channel.rateLimitPerUser + "000",
            {
              language: "es",
            }
          )}`,
          `**\`Creación:\`** ${channel.createdAt
            .toLocaleString("en-US", {
              timeZone: "America/Merida",
            })
            .substr(0, 9)} (${checkDays(channel.createdAt)})`,
          `**\`NSFW:\`** ${channel.nsfw ? "Sí" : "No"}`,
        ])
        .addField("> **Tópico:**", channel.topic || "No hay tópico")
        .addField(
          "> **Permisos:**",
          Markdown(
            channel
              .permissionsFor(message.guild.roles.cache.first())
              .toArray()
              .join(", ")
          )
        )
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.reply(infoEmbed);
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

function Markdown(str) {
  return `\`\`\`ml\n${str}\n\`\`\``;
}
