const { inspect } = require("util");

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
      const evaled = await eval(args.join(" "));
      let msg = await message.channel.send(
        `(${typeof evaled})\n${inspect(evaled, { depth: 0 }).replace(
          this.client.token,
          "CONTENT_PRIVATE"
        )}`,
        { code: "js", split: { char: "", maxLength: 1999 } }
      );
      for (let i of msg) {
        i.react("832659637026291712");
        i.awaitReactions((reaction, user) => {
          if (user.id != message.author.id) return;
          if (reaction.emoji.id == "832659637026291712") return i.delete();
        });
      }
    } catch (e) {
      message.channel.send(
        `${client.emotes.error} | **${e.name}:** ${e.message}`
      );
    }
  }
};
