const Discord = require("discord.js");
const Logs = require("../../Util/Models/logs.js");

module.exports = class MessageDelete {
  constructor(client) {
    this.client = client;
  }
  async run(message) {
    const client = this.client;
    try {
      if (!message.author) return;
      if (message.author.bot) return;
      if (!message.channel.type === "dm") return;
      const snipes = (await client.snipes.get(message.channel.id)) || [];
      snipes.unshift({
        content: message.content,
        author: message.author,
        image: message.attachments.first()
          ? message.attachments.first().proxyURL
          : null,
        date: new Date().toLocaleString("en-US", {
          timeZone: "America/Merida",
        }),
      });
      snipes.splice(10);
      client.snipes.set(message.channel.id, snipes);
      let ChannelLogs = await Logs.findOne({ guildID: message.guild.id });
      if (!ChannelLogs) return;
      if (message.content.length >= 1900)
        message.content = `${message.content.substr(0, 1800)}...`;
      const embedMessageDelete = new Discord.MessageEmbed()
        .setAuthor(
          message.guild.name + " | Un mensaje fue eliminado",
          message.guild.iconURL({ dynamic: true })
        )
        .setDescription(
          `**Contenido:**\n${
            message.content ||
            `[URL de la imagen](${
              message.attachments.first()
                ? message.attachments.first().proxyURL
                : null
            })`
          }`
        )
        .addField(
          "**Información:**",
          `**\`Autor del mensaje:\`** <@!${message.author.id}> | ${message.author.id}\n**\`Canal:\`** <#${message.channel.id}> | ${message.channel.id}`
        )
        .setImage(
          message.attachments.first()
            ? message.attachments.first().proxyURL
            : null
        )
        .setColor(message.member.displayHexColor || client.colores.redColor);
    //   message.guild.channels.cache
    //     .get(ChannelLogs.channelID)
    //     .send(embedMessageDelete);
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "messageDelete",
      });
    }
  }
};
