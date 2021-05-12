const Discord = require("discord.js");
const db = require("../../Util/Models/warns.js");

module.exports = class NameCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "rmwarn",
      aliases: ["remove-warn", "unwarn"],
      description: "Elimina cierta advertencia",
      usage: "rmwarning <user> <number>",
      dirname: __dirname,
      date: "Jueves, 6 de mayo de 2021",
      botPermissions: null,
      userPermissions: 8,
      cooldown: 5,
      nsfw: false,
      args: true,
      dev: false,
      enable: false,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

      if (!message.member.permissions.has(8)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `${client.emotes.error} | **No tienes el permiso necesario.**\n${client.emotes.warning} | **Permiso requerido:** \`ADMINISTRATOR\`**.**`
          )
          .setImage("https://i.imgur.com/mcqbxZJ.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }

      if (!user)
        return message.reply(
          `${client.emotes.error} | **Debes mencionar o darme la ID de un miembro del servidor.**`
        );
      if (!args[1])
        return message.reply(
          `${client.emotes.error} | **Ingresa el número de la advertencia que quieres eliminar.**`
        );
      let data = await db.findOne({
        guildID: message.guild.id,
        userID: user.user.id,
      });
      if (!data)
        return message.reply(
          `${client.emotes.error} | **Ese miembro no tiene casos registrados por el momento.**`
        );
      if (!data.content.length) {
        await db.findOneAndDelete({
          guildID: message.guild.id,
          userID: user.user.id,
        });

        return message.reply(
          `${client.emotes.error} | **Ese miembro no tiene casos registrados por el momento.**`
        );
      }
      let num = parseInt(args[1]) - 1;
      data.content.splice(num, 1);
      await data.save();
      message.reply(
        `${client.emotes.error} | **La advertencia fue removida.**`
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
