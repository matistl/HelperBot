const Discord = require("discord.js");

module.exports = class AvatarCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: ["av"],
      description: "Muestra el avatar de autor o mencionado del mensaje",
      usage: "avatar (user)",
      dirname: __dirname,
      date: "Jueves, ‎22‎ de ‎abril‎ de ‎2021",
      botPermissions: 19456,
      userPermissions: 3072,
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
      const user = args[0]
        ? message.mentions.members.first() ||
          message.guild.members.cache.find((e) =>
            e.user.username.match(new RegExp(`${args[0]}`, "gi"))
          ) ||
          message.guild.members.cache.get(args[0]) ||
          message.member
        : message.member;
      const embedAvatar = new Discord.MessageEmbed()
        .setTitle(`**Avatar de:** \`${user.user.tag}\``)
        .setDescription(
          `[URL del Avatar](${user.user.displayAvatarURL({
            dynamic: true,
            size: 2048,
          })})`
        )
        .setColor(client.colores.magentaColor)
        .setImage(user.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.reply(embedAvatar);
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
