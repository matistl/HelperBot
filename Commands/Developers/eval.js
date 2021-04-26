const Util = require("util");

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
    if (
      !["723158623404032022", "493063208576483329"].includes(message.author.id)
    )
      return;
    if (!args[0])
      return message.channel.send(
        `${client.emotes.error} | **Debes ingresar algo para evaluar!**`
      );
    try {
      let output = await eval(args.join(" "));
      let type = typeof output;
      if (typeof output !== "string")
        output = Util.inspect(output, { depth: 0 });

      if (output.length >= 1020) output = `${output.substr(0, 1010)}...`;

      let msg = await message.reply(
        `(${
          type.substring(0, 1).toUpperCase() + type.substring(1)
        }) ${output.replace(client.token, "Contenido Privado")}`,
        { code: "js" }
      );
      msg.react("832659637026291712");
      msg.awaitReactions((reaction, user) => {
        if (user.id != message.author.id) return;
        if (reaction.emoji.id == "832659637026291712") return msg.delete();
      });
    } catch (e) {
      message.reply(`${e.name}: ${e.message}`, {
        code: "js",
        split: { char: "", maxLength: 1999 },
      });
    }
  }
};
