// let { Structures } = require('discord.js');
// let Prefix = require('./Models/prefix.js');
// let Lang = require('./Models/lang.js');

// Structures.extend('Guild', Guild => {
// 	return class extends Guild {
// 		constructor(client, data) {
// 			super(client, data);
// 			this.lang = 'EN';
// 			this.prefix = "h!"
// 			this.cache = {
// 				prefix: false,
// 				lang: false
// 			};
// 		}

// 		async setPrefix(newP) {
// 			let Data = await Prefix.findOneAndUpdate({
// 				Guild: this.id,
// 				Prefix: newP
// 			});

// 			if (!Data) {
// 				await Prefix.create({
// 					Guild: this.id,
// 					Prefix: newP
// 				});
// 				this.cache.prefix = true;
// 				this.prefix = newP;
// 				return newP;
// 			} else {
// 				this.prefix = newP;
// 				this.cache.prefix = true;
// 				return newP;
// 			}
// 		}

// 		async getPrefix() {
// 			let a = await Prefix.findOne({ Guild: this.id });
// 			if (a) {
// 				this.prefix = a.Prefix;
// 				this.cache.prefix = true;
// 				return a.Prefix;
// 			} else {
// 				this.prefix = 'h!';
// 				this.cache.prefix = true;
// 				return 'h!';
// 			}
// 		}
// 		async setLang(newL) {
// 			let a = await Lang.findOneAndUpdate({ Lang: newL, Guild: this.id });
// 			if (!a) {
// 				await Lang.create({
// 					Guild: this.id,
// 					Lang: newL
// 				});
// 				this.cache.lang = true;
// 				this.lang = newL;
// 				return newL;
// 			} else {
// 				this.lang = newL;
// 				this.cache.lang = true;
// 				return newL;
// 			}
// 		}
// 	async getLang(){
// 			let a = await Lang.findOne({ Guild: this.id });
// 			if (a) {
// 				this.lang = a.Lang;
// 				this.cache.lang = true;
// 				return a.Lang;
// 			} else {
// 				this.prefix = 'EN';
// 				this.cache.lang = true;
// 				return 'EN';
// 			}
// 		}
// 	};
// });
