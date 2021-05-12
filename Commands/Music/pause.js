module.exports = class PauseCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "pause",
      aliases: [],
      description: "Pausa la canción el reproducción",
      usage: "pause",
      dirname: __dirname,
      date: "Jueves, ‎22‎ de ‎abril‎ de ‎2021",
      botPermissions: 3165440,
      userPermissions: null,
      cooldown: 4,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const serverQueue = client.distube.getQueue(message);
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
      if (serverQueue.pause) {
        return message.reply(
          `${client.emotes.error} | **La música ya está pausada.**`
        );
      }
      await client.distube.pause(message);
      message.reply(
        `${client.emotes.success} | **La canción ha sido pausada.**`
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
