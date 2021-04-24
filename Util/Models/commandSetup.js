const { model: Model, Schema } = require("mongoose");

const newModel = new Model("CommandSetup", new Schema({
    guildID: { type: String },
    commandName: { type: String },
    commandEnable: { type: Boolean }
}));

module.exports = newModel;