const { model, Schema } = require("mongoose");

const guildLogs = new Schema({
  guildID: String,
  channelID: String,
});

module.exports = new model("guildLogs", guildLogs);