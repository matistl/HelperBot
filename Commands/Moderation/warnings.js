const Discord = require("discord.js");
const db = require("../../Util/Models/warns.js");

module.exports = class WarningsCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "warnings",
      aliases: ["warns", "stats"],
      description: "Muestra las advertencias de un miembro",
      usage: "warnings <mention-member>",
      dirname: __dirname,
      date: "Jueves, 6 de mayo 2021",
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
      const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.member;
      if (!user)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes mencionar o darme la ID de un mimebro del servidor.**`
        );
      // let a = (user) => await message.guild.members.cache.get(user.id).user.tag;
      db.findOne(
        { guildID: message.guild.id, userID: user.user.id },
        async (err, data) => {
          if (err) throw err;
          if (!data)
            return message.reply(
              `〔 ${client.emotes.error} 〕**Ese miembro no tiene casos registrados por el momento.**`
            );
          if (!data.content.length) {
            await db.findOneAndDelete({
              guildID: message.guild.id,
              userID: user.user.id,
            });

            return message.reply(
              `〔 ${client.emotes.error} 〕**Ese miembro no tiene casos registrados por el momento.**`
            );
          }
          if (data.content.length) {
            const res = Discord.Util.splitMessage(
              data.content.map(
                (w, i) =>
                  `**#${i + 1}** | **\`Mod:\`** ${
                    message.guild.members.cache.get(w.author).user.tag
                  }\n**\`Razón:\`** ${w.reason}\n**\`Fecha:\`** ${w.date}`
              ),
              {
                char: "",
                maxLength: 1999,
              }
            );
            for (const Warnings of res) {
              const embedWarnings = new Discord.MessageEmbed()
                .setAuthor(
                  `Casos de ${user.user.tag}`,
                  user.user.displayAvatarURL({ dynamic: true })
                )
                .setDescription(Warnings)
                .setColor(client.colores.yellowColor);
              let caca = Discord.Message;
              caca = message.reply(embedWarnings);
            }
          }
        }
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
