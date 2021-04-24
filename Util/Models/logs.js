const { Model, Schema } = require("mongoose");

const guildLogs = new Schema({
  guildID: String,
  channelID: String,
});

module.exports = new Model("guildLogs", guildLogs);