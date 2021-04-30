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
      return message.channel.send(
        `${client.emotes.error} | **Debes ingresar algo para evaluar!**`
      );
    try {
      let output = await eval(args.join(" "));
      let type = typeof output;
      if (typeof output !== "string")
        output = Util.inspect(output, { depth: 0 });

      let msg = await message.reply(
        `(${
          type.substring(0, 1).toUpperCase() + type.substring(1)
        }) ${replace(output, [
          client.token,
          process.env.MONGO,
          process.env.YOUTUBE_COOKIE,
          process.env.KEY,
          process.env.DISCORD_TOKEN,
        ])}`,
        {
          code: "js",
          split: { char: "", maxLength: 1990 },
        }
      );
      msg.react("836408158120837180");
      msg.awaitReactions((reaction, user) => {
        if (user.id != message.author.id) return;
        if (reaction.emoji.id == "836408158120837180") return msg.delete();
      });
    } catch (e) {
      message.reply(`${e.name}: ${e.message}`, {
        code: "js",
        split: { char: "", maxLength: 1999 },
      });
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
