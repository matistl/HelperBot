const Discord = require("discord.js");
const SuggestionCode = require("../../Util/Models/suggestCode.js");
const SuggestionChannel = require("../../Util/Models/suggestions.js");

module.exports = class AcceptCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "accept",
      aliases: [],
      description: "Acepta una sugerencia",
      usage: "accept <suggest-code> (reason)",
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
      const code = args[0];
      const reason = args.slice(1).join(" ") || "No hay razón.";
      const dataChannel = await SuggestionChannel.findOne({
        guildID: message.guild.id,
      });
      if (!message.member.permissions.has(8)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `〔 ${client.emotes.error} 〕**No tienes el permiso necesario.**\n〔 ${client.emotes.warning} 〕**Permiso requerido:** \`ADMINISTRATOR\`**.**`
          )
          .setImage("https://i.imgur.com/mcqbxZJ.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }
      if (!dataChannel)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No hay un canal de sugerencias establecido en el servidor.**`
        );
      if (!code)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar el código de una sugerencia.**`
        );
      const data = await SuggestionCode.findOne({
        suggestChannelID: dataChannel.channelID,
        suggestCode: code,
      });
      if (!data) {
        return message.reply(
          `〔 ${client.emotes.error} 〕**El código es inválido o la sugerencia ya fue aceptada ó denegada en el servidor.**`
        );
      }
      const suggChannel = message.guild.channels.cache.get(
        dataChannel.channelID
      );
      if (!suggChannel)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No pude encontrar el canal de las sugerencias, tal vez fue eliminado.`
        );
      const suggestedEmbed = await suggChannel.messages
        .fetch(data.suggestMessageID)
        .catch(() => {});
      if (!suggestedEmbed) {
        await SuggestionCode.deleteOne({
          suggestChannelID: dataChannel.channelID,
          suggestCode: code,
        });
        return message.reply(
          `〔 ${client.emotes.error} 〕**No pude encontrar el mensaje con el embed de la sugerencia, tal vez el mensaje fue eliminado.**\n〔 ${client.emotes.warning} 〕**El código de la sugerencia fue eliminado.**`
        );
      }
      if (reason.length >= 1020) reason = `${reason.substr(0, 1000)}...`;
      const suggestEmbed = suggestedEmbed.embeds[0];
      suggestEmbed.fields.splice(0, 1);
      const acceptEmbed = new Discord.MessageEmbed(suggestEmbed)
        .setColor("#13FF00")
        .addField("> **Información:**", [
          `**\`Código:\`** ${code}`,
          "**`Estado:`** Aceptada",
          `**\`Sugerente:\`** ${
            message.guild.members.cache.get(data.suggestAuthor).user.tag
          } **(${
            message.guild.members.cache.get(data.suggestAuthor).user.id
          })**`,
          `**\`Aceptada por:\`**  ${message.author.tag} **(${message.author.id})**`,
        ])
        .addField("> **Razón:**", reason);
      message.reply(
        `〔 ${client.emotes.success} 〕**La sugerencia fue aceptada correctamente.**`
      );
      await suggestedEmbed.edit(acceptEmbed);
      await SuggestionCode.deleteOne({
        suggestChannelID: dataChannel.channelID,
        suggestCode: code,
      });
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
