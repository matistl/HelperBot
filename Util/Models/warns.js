const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  guildID: String,
  userID: String,
  content: Array,
});

module.exports = mongoose.model("warnings", Schema);
