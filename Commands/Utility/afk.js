const Discord = require("discord.js");
const AFK = require("../../Util/Models/afk.js");

module.exports = class AFKCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "afk",
      aliases: [],
      description: "Pone a un usuario en modo AFK",
      usage: "afk",
      dirname: __dirname,
      date: "Sábado, 1 de mayo de 2021",
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
      const AfkData = await AFK.findOne({ id: message.author.id });
      const Reason = args.join(" ") || "No especificada";
      if (Reason.length > 101)
        return message.reply(
          `〔 ${client.emotes.error} 〕**La razón no puede superar los 100 caracteres.**`
        );

      if (!AfkData) {
        const newData = new AFK({
          reason: Reason,
          id: message.author.id,
          isafk: true,
          timeAfk: Date.now(),
        });
        await newData.save();
      } else {
        await AFK.findOneAndUpdate(
          { id: message.author.id },
          {
            reason: Reason,
            isafk: true,
            timeAfk: Date.now(),
          }
        );
      }

      const embedAFKUser = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(client.colores.yellowColor)
        .setDescription(
          `> **Desde ahora,** \`${message.author.tag}\` **está en modo AFK.**`
        )
        .addField("> **Razón:**", `${Reason}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      message.reply(embedAFKUser);
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
