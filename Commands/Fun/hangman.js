const Hangman = require("../../Class/Hangman.js");

module.exports = class HangmanCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "hangman",
      aliases: [],
      description: "Inicia un juego de ahorcado",
      usage: "hangman <mention-user>",
      dirname: __dirname,
      date: "Martes, 11 de mayo de 2021",
      botPermissions: 0,
      userPermissions: 0,
      cooldown: 7,
      nsfw: false,
      args: false,
      dev: false,
      enable: false,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const ActiveGuilds = [];
      console.log(ActiveGuilds);
      if (ActiveGuilds.includes(message.guild.id))
        return message.reply(
          `${client.emotes.error} | **Ya hay una partida de hangman en el servidor, espera a que termine para poder jugar.**`
        );
      const mention = message.mentions.members.first();
      const author = [message.author.id];
      if (!mention)
        return message.reply(
          `${client.emotes.error} | **Debes mencionar a un usuario.**`
        );
      if (mention.id === message.author.id)
        return message.reply(
          `${client.emotes.error} | **No puedes mencionarte a ti mismo.**`
        );
      if (mention.user.bot)
        return message.reply(
          `${client.emotes.error} | **No puedes mencionar a un bot.**`
        );
      const mencion = mention;
      const jugadores = author.concat(mencion);
      ActiveGuilds.push(message.guild.id);
      const canal = await message.author.createDM();

      canal
        .send(
          "**Hey! Elige tu palabra para el juego de Hangman. Tienes 25 segundos.**"
        )
        .catch(() => {
          return message.reply(
            `**${message.author}, no puedo enviarte mensajes directos.**`
          );
        });

      let palabra;
      await canal
        .awaitMessages(
          (m) =>
            m.author.id == message.author.id &&
            m.content.replace(/[^A-Za-z0-9ñ ]/g, "").length,
          { max: 1, time: 25000, errors: ["time"] }
        )
        .then((collected) => {
          palabra = collected.first().content.replace(/[^A-Za-z0-9ñ ]/g, "");
        })
        .catch(() => canal.send("**Uh! El tiempo se agotó.**"));
      if (!palabra) return;
      const Game = new Hangman(palabra, {
        jugadores: jugadores,
        lowerCase: true,
        vidas: 5,
      });
      Game.on("end", async (game) => {
        const index = ActiveGuilds.indexOf(message.guild.id);
        ActiveGuilds.splice(index, 1);
        if (game.winned) {
          message.channel.send(
            `${client.emotes.success} | <@!${
              client.users.cache.get(game.turno.user.id).id
            }> **ha ganado! La palabra era:** \`${game.palabra}\`**.**`
          );
          return;
        } else {
          message.channel.send(
            `${client.emotes.error} | <@!${
              client.users.cache.get(game.turno.user.id).id
            }> **ha perdido! La palabra era:** \`${game.palabra}\`**.**`
          );
        }
      });
      message.channel.send(
        `${client.emotes.success} | <@!${
          message.author.id
        }> **ha elegido su palabra.**\n\n${Markdown(
          Game.game.ascii.join(" ")
        )}\n**Empieza:** \`${
          client.users.cache.get(Game.game.turno.user.id).tag
        }\``
      );
      const collector = message.channel.createMessageCollector(
        (msg) =>
          msg.author.id == Game.game.turno &&
          /[A-Za-z0-9ñ]/.test(msg.content) &&
          msg.content.length == 1
      );

      collector.on("collect", (msg) => {
        let encontrado = Game.find(msg.content);

        if (Game.game.ended) {
          collector.stop();
          return;
        }

        if (!encontrado)
          message.channel.send(
            `${client.emotes.error} | **Al Parecer, la letra:** \`${
              msg.content
            }\` **no se encontraba en la frase.**\n**Letras incorrectas:** \`${Game.game.letrasIncorrectas.join(
              ", "
            )}\`**.**`
          );

        message.channel.send(
          `${Markdown(Game.game.ascii.join(" "))}\n**Turno de:** \`${
            client.users.cache.get(Game.game.turno.user.id).tag
          }\`\n**Intentos restantes:** \`${Game.game.vidas}\`**.**`
        );
      });
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

function Markdown(str) {
  return `\`\`\`\n${str}\n\`\`\``;
}
