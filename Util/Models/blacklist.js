const { model: Model, Schema } = require("mongoose");

const SchemaBlacklist = new Schema({
    ID: { type: String, required: true },
    Reason: { type: String, required: true },
    Date: { type: Number, required: true },
    Author: { type: String, required: true },
});

module.exports = Model("blacklist", SchemaBlacklist);