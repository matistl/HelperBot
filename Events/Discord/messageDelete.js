const Discord = require("discord.js");

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
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "messageDelete",
      });
    }
  }
};
