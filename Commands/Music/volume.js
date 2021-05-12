const Discord = require("discord.js");

module.exports = class VolumeCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "volume",
      aliases: ["v", "vl"],
      description: "Cambia el volumen de las canciones",
      usage: "volume <1-200>",
      dirname: __dirname,
      date: "Viernes, ‎23‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 4,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    const prefix = await client.getPrefix(message);
    try {
      const serverQueue = await client.distube.getQueue(message);

      if (!message.member.voice.channel)
        return message.reply(
          `${client.emotes.error} | **Debes estar en un canal de voz para usar este comando.**`
        );

      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return message.reply(
          `${client.emotes.error} | **No estas en el mismo canal que yo.**`
        );

      if (!serverQueue)
        return message.reply(
          `${client.emotes.error} | **No hay canciones en la lista.**`
        );
      const volume = parseInt(args[0]);
      if (!args[0])
        return message.reply(
          `${client.emotes.error} | **Debes ingresar una cantidad.**`
        );
      if (isNaN(volume))
        return message.reply(
          `${client.emotes.error} | **Debes ingresar únicamente números.**`
        );
      if (
        Math.round(parseInt(args[0])) < 1 ||
        Math.round(parseInt(args[0])) > 200
      )
        return message.reply(
          `${client.emotes.error} | **Debes ingresar un número entre el:** \`1\` **y el** \`200\`**.**`
        );
      client.distube.setVolume(message, volume);
      message.reply(
        `${client.emotes.success} | **El volumen ahora es de:** \`${volume}%\`.`
      );
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
