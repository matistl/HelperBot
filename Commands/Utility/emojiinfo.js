const Discord = require("discord.js");

module.exports = class EmojiInfoCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "emojiinfo",
      aliases: ["emoji", "ei"],
      description: "Muestra la información de un emoji propio del servidor",
      usage: "emojiinfo <emoji>",
      dirname: __dirname,
      date: "Viernes, ‎23‎ de ‎abril‎ de ‎2021",
      botPermissions: 19456,
      userPermissions: 3072,
      cooldown: 3,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    const prefix = await client.getPrefix(message);
    try {
      const emojiProvided = args[0];
      if (!emojiProvided)
        return message.reply(
          `${client.emotes.error} | **Debes ingresar un emoji!**`
        );

      const match =
        emojiProvided.match(/<:[a-zA-Z0-9_-]+:(\d{18})>/) ||
        emojiProvided.match(/<a:[a-zA-Z0-9_-]+:(\d{18})>/);

      if (!match || !match[1])
        return message.reply(
          `${client.emotes.error} | **Debes ingresar un emoji válido, debe ser de este servidor!**`
        );
      let emoji = message.guild.emojis.cache.get(match[1]);
      const embedEmojiInfo = new Discord.MessageEmbed()
        .setColor(client.colores.pinkColor)
        .setTitle("__**Información del emoji**__")
        .setDescription([
          `**\`Nombre:\`** ${emoji.name}`,
          `**\`ID:\`** ${emoji.id}`,
          `**\`Identificador:\`** \`<:${emoji.identifier}>\``,
          `**\`Animado:\`** ${emoji.animated ? "Sí (GIF)" : "No (PNG)"}`,
          `**\`Añadido por:\`** ${
            (await emoji
              .fetchAuthor()
              .then((user) => user.tag)
              .catch(() => {})) || "No tengo permiso para verlo"
          }`,
          `**\`Fecha de creación:\`** ${emoji.createdAt
            .toLocaleString("en-US", {
              timeZone: "America/Merida",
            })
            .substr(0, 9)} (${checkDays(emoji.createdAt)})`,
          `**\`URL:\`** [Click aquí](${emoji.url})`,
        ])
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(emoji.url);
      message.reply(embedEmojiInfo);
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
