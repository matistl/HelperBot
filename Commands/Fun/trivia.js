const {Game} = require("../../Class/Trivia.js");

module.exports = class TriviaCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "trivia",
      aliases: [],
      description:
        "Crea un juego para adivinar la respuesta según tus conocimientos",
      usage: "trivia",
      dirname: __dirname,
      date: "Martes, 11 de mayo de 2021",
      botPermissions: 0,
      userPermissions: 0,
      cooldown: 5,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try { 
    if(Game.get_guilds.includes(message.guild.id)) return message.reply(`〔 ${client.emotes.error} 〕**Ya hay una partida de trivia en el servidor, espera a que termine para poder jugar.**`);
    new Game(message, args); 
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
