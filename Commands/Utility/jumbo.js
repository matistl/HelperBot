const Discord = require("discord.js");

module.exports = class JumboCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "jumbo",
      aliases: [],
      description: "Agranda el tamaño un emoji de discord",
      usage: "jumbo <emoji>",
      dirname: __dirname,
      date: "Viernes, ‎23‎ de ‎abril‎ de ‎2021",
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
      if (!args[0])
        return message.reply(
          `${client.emotes.error} | **Debes ingresar un emoji!**`
        );

      var emoji = Discord.Util.parseEmoji(args[0]);

      if (emoji.id == null)
        return message.reply(
          `${client.emotes.error} | **Debes ingresar un emoji válido!**`
        );

      const embedEmoji = new Discord.MessageEmbed()
        .setDescription(
          `[Emoji URL](https://cdn.discordapp.com/emojis/${emoji.id}.${
            emoji.animated ? "gif" : "png"
          })`
        )
        .setImage(
          `https://cdn.discordapp.com/emojis/${emoji.id}.${
            emoji.animated ? "gif" : "png"
          }`
        )
        .setColor(client.colores.discordColor);

      message.reply(embedEmoji);
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
