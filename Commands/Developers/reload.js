module.exports = class ReloadCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "reload",
      aliases: ["re"],
      description: "Recarga un comando",
      usage: "reload <category> <command-name>",
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

      const folderName = args[0];
      if (!folderName)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Ingresa una categoría.**`
        );
      let xd = await client.commands.filter((x) =>
        x.information.category.includes(folderName)
      );

      if (!xd.size)
        return message.reply(
          `〔 ${client.emotes.error} 〕**La categoría dada no tiene comandos o no existe.**`
        );

      const commandName = args.slice(1).join(" ");
      if (!commandName)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Ingresa un comando.**`
        );
      const check = await client.commands.has(commandName);
      if (!check)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Ingresa un comando válido.**`
        );

      delete require.cache[
        require.resolve(`../../Commands/${folderName}/${commandName}.js`)
      ];
      client.commands.delete(commandName);
      const pull = require(`../../Commands/${folderName}/${commandName}.js`);
      client.commands.set(commandName, new pull(client));
      message.reply(
        `〔 ${client.emotes.success} 〕**El comando:** \`${commandName}\` **ha sido recargado.**`
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
