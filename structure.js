const Discord = require("discord.js");

module.exports = class NameCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "",
      aliases: [],
      description: "",
      usage: "",
      dirname: __dirname,
      date: null,
      botPermissions: null,
      userPermissions: null,
      cooldown: 0,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    const prefix = await client.getPrefix(message);
    try {
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
