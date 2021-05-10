const Discord = require("discord.js");

module.exports = class ClearCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "clear",
      aliases: ["purge"],
      description: "Elimina cierta cantidad de mensajes",
      usage: "clear <amount>",
      dirname: __dirname,
      date: "Jueves, 6 de mayo de 2021",
      botPermissions: 19458,
      userPermissions: 2,
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
      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
          .setDescription([
            `〔 ${client.emotes.error} 〕**No tienes el permiso necesario.**`,
            `〔 ${client.emotes.warning} 〕**Permiso Requerido:** \`MANAGE_MESSAGES\`**.**`,
          ])
          .setColor(client.colores.redColor)
          .setImage("https://i.imgur.com/HKqT9sy.gif");
        return message.reply(embed);
      }

      if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
          .setDescription([
            `〔 ${client.emotes.error} 〕**No tengo el permiso necesario.**`,
            `〔 ${client.emotes.warning} 〕**Permiso Requerido:** \`MANAGE_MESSAGES\`**.**`,
          ])
          .setColor(client.colores.redColor)
          .setImage("https://i.imgur.com/HKqT9sy.gif");
        return message.reply(embed);
      }
      let deleteAmount;

      if (isNaN(args[0]) || parseInt(args[0]) <= 0)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Ingresa únicamente números.**`
        );

      if (parseInt(args[0]) > 100)
        return message.reply(
          `〔 ${client.emotes.error} 〕**La cantidad no puede ser más deo 100.**`
        );

      deleteAmount = parseInt(args[0]);

      await message.channel.bulkDelete(deleteAmount + 1, true);

      message.channel.send(
          `〔 ${client.emotes.sucess} 〕**Se eliminaron** \`${deleteAmount}\` **mensajes exitosamente.**`
        )
        .then((x) => x.delete({ timeout: 7000 }));
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
