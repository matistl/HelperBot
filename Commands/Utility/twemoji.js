const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const svg2img = require("node-svg2img");

module.exports = class TwemojiCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "twemoji",
      aliases: [],
      description: "Agranda un emoji default de discord",
      usage: "twemoji 😳",
      dirname: __dirname,
      date: "Viernes, ‎23‎ de ‎abril‎ de ‎2021",
      botPermissions: 35840,
      userPermissions: null,
      cooldown: 6,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const emoji = args[0];
      const prefix = await client.getPrefix(message);
      if (!emoji)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar un emoji.**`
        );

      const number = parseInt(args.slice(1).join(" "));
      const size = number && number <= 1024 && number > 0 ? number : 150;

      const regexp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
        `${emoji}`
      );
      if (!regexp)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar un emoji válido.**`
        );

      const a = parse(`${emoji}`);
      const b = a[0].url;
      svg2img(
        b,
        { format: "png", width: size, height: size },
        function (err, data) {
          const ab = new Discord.MessageAttachment(
            data,
            "TwEmojiHelperBot.png"
          );
          message.reply(
            `> **Puedes usar:** \`${prefix}twemoji ${emoji} (size)\` **para cambiar el tamaño de la imagen.**`,
            ab
          );
        }
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
