const Discord = require("discord.js");

module.exports = class FilterlistCommand extends (
  require("../../Class/Command")
) {
  constructor(client) {
    super(client, {
      name: "filterlist",
      aliases: ["fl"],
      description: "Muestra la lista de filtros",
      usage: "filterlist",
      dirname: __dirname,
      date: "Domingo, 2 de mayo de 2021",
      botPermissions: 0,
      userPermissions: 0,
      cooldown: 4,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const filtros1 = client.filters.slice(0, 9).join("\n");
      const filtros2 = client.filters.slice(10, 18).join("\n");
      const embedFiltros = new Discord.MessageEmbed()
        .setTitle("__**Lista de filtros**__")
        .setDescription([filtros1, filtros2])
        .setColor(client.colores.yellowColor);
      message.reply(embedFiltros);
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
