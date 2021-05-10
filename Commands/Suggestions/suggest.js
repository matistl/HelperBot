const Discord = require("discord.js");
const Suggestion = require("../../Util/Models/suggestions.js");

module.exports = class SuggestCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "suggest",
      aliases: [],
      description: "Envia una sugerencia al canal de sugerencias del servidor",
      usage: "suggest <suggest>",
      dirname: __dirname,
      date: "Sábado, 8 de mayo de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 5,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const letras = [
        "c",
        "a",
        "f",
        "g",
        "m",
        "h",
        "c",
        "s",
        "d",
        "u",
        "y",
        "r",
        "e",
        "xdsf",
        "jxksa",
        "ase",
        "xd",
        "psa",
      ];
      let a = letras[Math.floor(Math.random() * letras.length)];
      let ab = letras[Math.floor(Math.random() * letras.length)];
      let b = Math.floor(Math.random() * 9000);
      let ba = Math.floor(Math.random() * 189);
      const randomCode = a + ab + ba * b;
      const suggestionContent = args.join(" ");
      const data = await Suggestion.findOne({ guildID: message.guild.id });
      if (!data)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No hay un canal de sugerencias establecido en el servidor.**`
        );
      if (!data.channelID)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No pude encontrar el canal establecido para las sugerencias en el servidor, tal vez fue eliminado.`
        );
      if (!suggestionContent)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar el contenido de la sugerencia.**`
        );
      message.reply(
        `〔 ${client.emotes.success} 〕**La sugerencia fue enviada correctamente.**`
      );
      client.getSuggestionChannel(
        {
          Suggest: suggestionContent,
          Color: client.colores.yellowColor,
          Code: randomCode,
          Status: "En espera de ser aprobada.",
        },
        message
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
