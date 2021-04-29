const Discord = require("discord.js");
const Logs = require("../../Util/Models/logs.js");

module.exports = class MessageUpdate {
  constructor(client) {
    this.client = client;
  }
  async run(oldMessage, newMessage) {
    const client = this.client;
    try {
      if (newMessage.partial) return;
      if (newMessage.author.bot) return;
      if (oldMessage.content == newMessage.content) return;
      client.emit("message", newMessage);
      let ChannelLogs = await Logs.findOne({ guildID: newMessage.guild.id });
      if (!ChannelLogs) return;
      if (oldMessage.content.length >= 950)
        oldMessage.content = `${oldMessage.content.substr(0, 900)}...`;
      if (newMessage.content.length >= 950)
        newMessage.content = `${newMessage.content.substr(0, 900)}...`;
      let img;
      if (oldMessage.attachments.first()) {
        img = `[Click aquí](${oldMessage.attachments.first().proxyURL})`;
      } else {
        img = "No hay imagen";
      }
      const embedMessageUpdate = new Discord.MessageEmbed()
        .setColor(oldMessage.member.displayHexColor || client.colores.redColor)
        .addField(
          "**Mensaje Original:**",
          `${
            oldMessage.content ||
            `[Click aquí](${oldMessage.attachments.first().proxyURL})`
          }`
        )
        .addField(
          "**Mensaje Editado:**",
          `${
            newMessage.content ||
            `[Click aquí](${oldMessage.attachments.first().proxyURL})`
          }`
        )
        .addField(
          "**Información:**",
          `**\`Autor del mensaje:\`** ${oldMessage.author} | ${oldMessage.author.id}\n**\`Canal:\`**<#${newMessage.channel.id}> | ${newMessage.channel.id}\n**\`URL del mensaje:\`** [Click aquí](${newMessage.url})\n**\`URL de la imagen:\`** ${img}`
        )
        .setImage(
          oldMessage.attachments.first()
            ? oldMessage.attachments.first().proxyURL
            : null
        )
        .setAuthor(
          newMessage.guild.name + " | Un mensaje fue editado",
          newMessage.guild.iconURL({ dynamic: true })
        );
      newMessage.guild.channels
        .resolve(ChannelLogs.channelID)
        .send(embedMessageUpdate);
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "MessageUpdate",
      });
    }
  }
};
