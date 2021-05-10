const { MessageEmbed } = require("discord.js");

module.exports = class SnipeCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "snipe",
      aliases: ["ms"],
      description: "Muestra el último msg borrado",
      usage: "snipe",
      dirname: __dirname,
      date: "Jueves, ‎22‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: null,
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
      const snipes = client.snipes.get(message.channel.id) || [];
      const msg = snipes[args[0] - 1 || 0];
      if (!msg)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No encuentro ningún mensaje eliminado.**`
        );
      const embedSnipe = new MessageEmbed()
        .setAuthor(
          msg.author.tag,
          msg.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(client.colores.redColor)
        .setDescription(msg.content || `[Image URL](${msg.image})`)
        .setFooter(`${msg.date} | ${args[0] || 1}/${snipes.length}`)
        .setImage(msg.image || null);
      message.reply(embedSnipe);
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
