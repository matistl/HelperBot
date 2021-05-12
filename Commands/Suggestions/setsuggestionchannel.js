const Discord = require("discord.js");
const Suggestion = require("../../Util/Models/suggestions.js");

module.exports = class SetSuggestionChannelCommand extends (
  require("../../Class/Command")
) {
  constructor(client) {
    super(client, {
      name: "setsuggestionchannel",
      aliases: ["setsuggest"],
      description: "Establece un canal para las sugerencias del servidor!",
      usage: "setsuggestionchannel <mention-channel>",
      dirname: __dirname,
      date: "Sábado, 8 de mayo de 2021",
      botPermissions: null,
      userPermissions: 8,
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
      const channelXD = message.mentions.channels.first();

      if (!message.member.permissions.has(8)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `${client.emotes.error} | **No tienes el permiso necesario.**\n〔 ${client.emotes.warning} 〕**Permiso requerido:** \`ADMINISTRATOR\`**.**`
          )
          .setImage("https://i.imgur.com/mcqbxZJ.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }

      if (!channelXD)
        return message.reply(
          `${client.emotes.error} | **Debes mencionar un canal.**`
        );

      if (!message.guild.channels.cache.get(channelXD.id))
        return message.reply(
          `${client.emotes.error} | **El canal mencionado debe ser de este servidor.**`
        );

      if (channelXD.type !== "text")
        return message.reply(
          `${client.emotes.error} | **Debes mencionar únicamente a canales de texto.**`
        );

      if (!channelXD.permissionsFor(message.guild.me).has("VIEW_CHANNEL"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios en el canal mencionado.**\n${client.emotes.waring} | **Permiso requerido:** \`VIEW_CHANNEL\`.`
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/ecUiHLM.gif")
        );

      if (!channelXD.permissionsFor(message.guild.me).has("SEND_MESSAGES"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios en el canal mencionado.**\n${client.emotes.waring} | **Permiso requerido:** \`SEND_MESSAGES\`.`
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/7DjLk0n.gif")
        );

      let a = await Suggestion.findOne({ guildID: message.guild.id });

      let sv = new Suggestion({
        guildID: message.guild.id,
        channelID: message.mentions.channels.first().id,
      });

      a
        ? await Suggestion.updateOne(
            { guildID: message.guild.id },
            { channelID: message.mentions.channels.first().id }
          )
        : await sv.save();

      message.reply(
        `${client.emotes.success} | **El canal:** \`#${
          message.mentions.channels.first().name
        }\` **fue establecido como el canal de las sugerencias.**`
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
