module.exports = class SayCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "say",
      aliases: [],
      description: "Repite lo que digas",
      usage: "say <text>",
      dirname: __dirname,
      date: "Jueves, 6 de mayo de 2021",
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
      let texto = args.join(" ");
      if (!texto)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar un texto a repetir.**`
        );
      if (message.deletable) {
        await message.delete();
      }
      await message.channel.send(texto, { allowedMentions: { parse: [] } });
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
