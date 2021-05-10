module.exports = class ExecuteCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "execute",
      aliases: ["exec", "ex"],
      description: "Ejecuta un proceso",
      usage: "exec <action>",
      dirname: __dirname,
      date: "Sábado, 1 de mayo de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 0,
      nsfw: false,
      args: true,
      dev: true,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      if (!client.devs.includes(message.author.id)) return;

      if (!args[0])
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar algo para ejecutar.**`
        );

      const date = Date.now();
      let res = require("child_process").execSync(args.join(" ")).toString();

      res = res.split("").reverse().slice(0, 1900).reverse().join("");

      message.reply(
        `Time: ${Date.now() - date}\n\n${replace(res, [
          client.token,
          process.env.MONGO,
          process.env.YOUTUBE_COOKIE,
          process.env.KEY,
          process.env.DISCORD_TOKEN,
        ])}`,
        {
          split: { char: "", maxLength: 1990 },
          code: "js",
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

function replace(string, array) {
  let res = string;

  for (let i of array) {
    res = res.split(i).join("Contenido Privado");
  }

  return res;
}
