const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  suggestCode: String,
  suggestAuthor: String,
  suggestChannelID: String,
  suggestMessageID: String,
});

module.exports = new mongoose.model("suggestCodes", Schema);
