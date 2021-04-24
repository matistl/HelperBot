const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
	Guild: { type: String },
	Prefix: { type: String }
});
module.exports = mongoose.model('prefixes', Schema);