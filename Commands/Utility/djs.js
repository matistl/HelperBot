const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = class DJSCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "djs",
      aliases: ["docs"],
      description: "Busca algo en la documentación de discord.js",
      usage: "djs <search>",
      dirname: __dirname,
      date: "Jueves, 29 de abril de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 3,
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
          `〔 ${client.emotes.error} 〕**Debes ingresar algo para buscar.**`
        );
      fetch(
        `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
          args.join(" ")
        )}`
      )
        .then((e) => e.json())
        .then((data) => {
          const embed = new Discord.MessageEmbed(data).setColor(client.color);
          message.reply(embed);
        })
        .catch((err) => {
          message.reply(
            `〔 ${client.emotes.error} 〕**Ocurrió un problema al momento de la busqueda.**`
          );
        });
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
