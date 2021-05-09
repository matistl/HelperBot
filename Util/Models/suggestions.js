const { model, Schema } = require("mongoose");

const suggestion = new Schema({
  guildID: String,
  channelID: String,
});

module.exports = new model("suggestion", suggestion);
