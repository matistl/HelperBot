const Discord = require("discord.js");

module.exports = class ServericonCommand extends (
  require("../../Class/Command")
) {
  constructor(client) {
    super(client, {
      name: "servericon",
      aliases: ["icon"],
      description: "Muestra el ícono del servidor",
      usage: "servericon",
      dirname: __dirname,
      date: "Martes, 27 de abril de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 3,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const embedIconServer = new Discord.MessageEmbed()
        .setDescription(
          `[Ícono del servidor](${message.guild.iconURL({ dynamic: true })})`
        )
        .setImage(message.guild.iconURL({ dynamic: true }))
        .setColor(client.colores.yellowColor)
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.reply(embedIconServer);
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
