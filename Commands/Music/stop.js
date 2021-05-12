module.exports = class NameCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "stop",
      aliases: [],
      description: "Detiene y borra la cola de reproducción de música",
      usage: "stop",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 3,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const queue = client.distube.getQueue(message);
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
      await client.distube.stop(message);
      message.reply(`${client.emotes.success} | **La cola ha sido detenida.**`);
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
