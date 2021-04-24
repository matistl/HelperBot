const blacklistModel = require("../../Util/Models/blacklist.js");

module.exports = class BlacklistCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "blacklist",
      aliases: ["bl"],
      description: "Añade, remueve o da la info de un usuario en la blacklist",
      usage: "bl <add | rm | info>",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 0,
      nsfw: false,
      args: true,
      dev: true,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const user =
        message.mentions.users.first() || client.users.cache.get(args[1]);

      if (
        !["493063208576483329", "723158623404032022"].includes(
          message.author.id
        )
      )
        return;

      if (!user)
        return message.channel.send(
          `${client.emotes.error} | **Debes mencionar o darme la ID de un usuario!**`
        );

      if (user.id === "723158623404032022")
        return message.channel.send(
          `${client.emotes.error} | **No puedo añadir a la blacklist a mi developer!**`
        );
      if (user.id === "493063208576483329")
        return message.channel.send(
          `${client.emotes.error} | **No puedo añadir a la blacklist a mi developer!**`
        );
      switch (args[0]) {
        case "add":
          await blacklistModel.findOne({ ID: user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
              return message.channel.send(
                `${client.emotes.error} | **Ese usuario ya está en la blacklist!**`
              );
            } else {
              data = new blacklistModel({
                ID: user.id,
                Reason: args.slice(2).join(" ") || "No hay razón!",
                Date: Date.now(),
                Author: message.author.id,
              });
            }
            data.save();
            message.channel.send(
              `${client.emotes.success} | **El usuario:** \`${user.tag}\` **fue añadido correctamente de la blacklist!**`
            );
          });
          break;
        case "rm":
          await blacklistModel.findOne({ ID: user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
              await blacklistModel.findOneAndDelete({ ID: user.id });
              return message.channel.send(
                `${client.emotes.success} | **El usuario:** \`${user.tag}\` **fue removido correctamente de la blacklist!**`
              );
            } else {
              return message.channel.send(
                `${client.emotes.error} | **Ese usuario no está en la blacklist!**`
              );
            }
          });
          break;
        case "info":
          await blacklistModel.findOne({ ID: user.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
              return message.channel.send(
                `${client.emotes.error} | **Ese usuario no está en la blacklist!**`
              );
            } else {
              const embed = new client.discord.MessageEmbed()
                // .setTitle("Información")
                .addField("Información:", [
                  `\`Mención:\` <@!${data.ID}>`,
                  `\`User:\` ${client.users.cache.get(data.ID).tag}`,
                  `\`User ID:\` ${data.ID}`,
                  `\`Tiempo:\` ${require("ms")(Date.now() - data.Date)}`,
                  `\`Author:\` <@!${data.Author}>`,
                ])
                .addField("Razón:", data.Reason)
                .setThumbnail(
                  client.users.cache
                    .get(data.ID)
                    .displayAvatarURL({ dynamic: true })
                )
                .setColor(client.colores.fuchsiaColor);
              message.channel.send(embed);
            }
          });
          break;
        default:
          message.channel.send(
            `${client.emotes.error} | **Debes ingresar que quireres hacer:** \`<add | rm | info>\``
          );
          break;
      }
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
