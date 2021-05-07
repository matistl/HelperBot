const Discord = require("discord.js");

module.exports = class ShuffleCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "shuffle",
      aliases: [],
      description: "Revuelve la lista de canciones",
      usage: "shuffle",
      dirname: __dirname,
      date: "Domingo, 25 de abril de 2021",
      botPermissions: null,
      userPermissions: null,
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
      const queue = await client.distube.getQueue(message);

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

      if (!queue)
        return message.reply(
          `${client.emotes.error} | **No hay canciones en la lista.**`
        );

      await client.distube.shuffle(message);
      message.reply(
        `${client.emotes.success} | **La cola de canciones fue revuelta.**`
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
