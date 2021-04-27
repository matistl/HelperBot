const Discord = require("discord.js");
const prefixSchema = require("../../Util/Models/prefix.js");

module.exports = class ResetPrefixCommand extends (
  require("../../Class/Command")
) {
  constructor(client) {
    super(client, {
      name: "resetprefix",
      aliases: ["rp"],
      description: "Elimina el prefix personalizado del servidor",
      usage: "rp",
      dirname: __dirname,
      date: "Lunes, 26 de abril de 2021",
      botPermissions: null,
      userPermissions: 8,
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
      if (!message.member.permissions.has(8)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `${client.emotes.error} | **No tienes el permiso necesario!**\n${client.emotes.warning} | **Permiso requerido:** \`ADMINISTRATOR\``
          )
          .setImage("https://i.imgur.com/mcqbxZJ.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }
      let borrarPrefix = await prefixSchema.findOneAndDelete({
        Guild: message.guild.id,
      });
      if (!borrarPrefix)
        return message.reply(
          `${client.emotes.error} | **No hay un prefix personalizado en el servidor!**`
        );
      message.reply(
        `${client.emotes.success} | **El prefix a sido restablecido! El prefix ahora es:** \`h!\``
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
