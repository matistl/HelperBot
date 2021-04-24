module.exports = class AutoplayCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "autoplay",
      aliases: ["ap"],
      description: "Habilita o deshabilita el modo autoplay",
      usage: "autoplay",
      dirname: __dirname,
      date: "Viernes, ‎23‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
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
    const prefix = await client.getPrefix(message);
    try {
      if (!message.member.voice.channel)
        return message.reply(
          `${client.emotes.error} | **Debes estar en un canal de voz para usar este comando!**`
        );

      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return message.reply(
          `${client.emotes.error} | **No estas en el mismo canal que yo!**`
        );
      const queue = await client.distube.getQueue(message);
      if (!queue)
        return message.reply(
          `${client.emotes.error} | **No hay canciones en la lista!**`
        );
      message
        .reply(
          `${client.emotes.success} | **Ahora el estado del autoplay es:** \`${
            (await client.distube.toggleAutoplay(message)) ? "On" : "Off"
          }\``
        )
        .catch((e) => {});
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
