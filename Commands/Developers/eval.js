const Util = require("util");
const Discord = require("discord.js");

module.exports = class EvalCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "eval",
      aliases: ["ev", "e"],
      description: "Evalua un código de JavaScript desde el bot",
      usage: "eval <code>",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: 19456,
      userPermissions: 2048,
      cooldown: 0,
      nsfw: false,
      args: true,
      dev: true,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    if (!client.devs.includes(message.author.id)) return;
    if (!args[0])
      return message.reply(
        `〔 ${client.emotes.error} 〕**Debes ingresar algo para evaluar.**`
      );
    try {
      let output = await eval(args.join(" "));
      let type = typeof output;
      if (typeof output !== "string")
        output = Util.inspect(output, { depth: 0 });

      // if (output.length >= 2000) output = `${output.substr(0, 1990)}...`;

      let msg = await message.reply(
        `(${
          type.substring(0, 1).toUpperCase() + type.substring(1)
        }) ${replace(output, [
          client.token,
          process.env.MONGO,
          process.env.YOUTUBE_COOKIE,
          process.env.KEY,
          process.env.DISCORD_TOKEN,
          process.env.ALEX_FLIP_TOKEN,
        ])}`,
        {
          code: "js",
          split: { char: "", maxLength: 1999 },
        }
      );
      for (let i of msg) {
        i.react("836408158120837180");
        i.awaitReactions((reaction, user) => {
          if (user.id != message.author.id) return;
          if (reaction.emoji.id == "836408158120837180") return i.delete();
        });
      }
    } catch (e) {
      let m = await message.reply(`${e.name}: ${e.message}`, {
        code: "js",
        split: { char: "", maxLength: 1999 },
      });
      for (let o of m) {
        o.react("836408158120837180");
        o.awaitReactions((reaction, user) => {
          if (user.id != message.author.id) return;
          if (reaction.emoji.id == "836408158120837180") return o.delete();
        });
      }
    }
  }
};

function replace(string, array) {
  let res = string;

  for (let i of array) {
    res = res.split(i).join("Contenido Privado");
  }

  return res;
}
