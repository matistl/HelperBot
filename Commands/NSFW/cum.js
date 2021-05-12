const Discord = require("discord.js");
const hmtai = require("hmtai");

module.exports = class CumCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "cum",
      aliases: [],
      description: "Muestra imagenes NSFW de cum",
      usage: "cum",
      dirname: __dirname,
      date: "Lunes, 3 de mayo de 2021",
      botPermissions: 0,
      userPermissions: 0,
      cooldown: 3,
      nsfw: true,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      if (!message.channel.nsfw)
        return message.reply(
          `${client.emotes.error} | **No puedes usar este comando en un canal que no está marcado como NSFW.**`
        );
      const img = await hmtai.nsfw.cum();
      const embed = new Discord.MessageEmbed()
        .setTitle("> Disfrútalo \❤️.")
        .setImage(img)
        .setColor("RANDOM")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.reply(embed);
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
