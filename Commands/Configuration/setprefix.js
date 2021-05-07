const prefixSchema = require(`../../Util/Models/prefix.js`);
const Discord = require("discord.js");

module.exports = class SetPrefixCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "setprefix",
      aliases: ["prefix"],
      description: "Establece un prefix personalizado en el servidor",
      usage: "setprefix <new-prefix>",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: 8,
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
      const res = args.join(" ");
      if (!message.member.permissions.has(8)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `${client.emotes.error} | **No tienes el permiso necesario.**\n${client.emotes.warning} | **Permiso requerido:** \`ADMINISTRATOR\`**.**`
          )
          .setImage("https://i.imgur.com/mcqbxZJ.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }
      if (!res)
        return message.channel.send(
          `${client.emotes.error} | **Debes ingresar el nuevo prefix.**`
        );
      if (res.length > 3)
        return message.channel.send(
          `${client.emotes.error} | **El nuevo prefix no puede superar los 3 caracteres.**`
        );
      let findOnePrefix = await prefixSchema.findOne({
        Guild: message.guild.id,
      });

      let ServerPrefix = new prefixSchema({
        Guild: message.guild.id,
        Prefix: res,
      });

      findOnePrefix
        ? await prefixSchema.updateOne(
            { Guild: message.guild.id },
            { Prefix: res }
          )
        : await ServerPrefix.save();
      const embed = new client.discord.MessageEmbed()
        .setDescription(
          `${client.emotes.success} | **El nuevo prefix del servidor es:** \`${res}\``
        )
        .setColor(client.colores.greenColor);
      message.channel.send(embed);
    } catch (e) {
      client.error({
        error: e,
        message: message,
        type: "command",
        name: this.information.name,
      });
    }
  }
};
