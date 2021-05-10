const Discord = require("discord.js");

module.exports = class OchoBallCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "8ball",
      aliases: ["8b"],
      description: "El bot responde a una pregunta.",
      usage: "8ball <question>",
      dirname: __dirname,
      date: "Jueves, 6 de mayo de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 3,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const Pregunta = args.join(" ");
      if (!Pregunta)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar una pregunta.**`
        );

      if (Pregunta.length > 71)
        return message.reply(
          `〔 ${client.emotes.error} 〕**La pregunta no puede superar los 70 caracteres.**`
        );
      const Random =
        client.answers[Math.floor(Math.random() * client.answers.length)];
      const embed8ball = new Discord.MessageEmbed()
        .setTitle("> **:8ball: | Juego de la bola 8**")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription([
          `> **\`Pregunta:\`**\n${Pregunta}`,
          ``,
          `> **\`Respuesta:\`**\n${Random}`,
        ])
        .setColor(client.color);
      message.reply(embed8ball);
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
