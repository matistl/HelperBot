const Discord = require("discord.js");
const { getPreview, getTracks } = require("spotify-url-info");

module.exports = class PlayCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["p"],
      description: "Reproduce música de youtube y otras plataformas",
      usage: "play <song-name | URL>",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
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
      const string = args.join(" ");

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

      if (!string)
        return message.reply(
          `${client.emotes.error} | **Ingresa el nombre de la canción que quieres que reproduzca!**`
        );

      const channelXD = message.member.voice.channel;
      if (!channelXD.permissionsFor(message.guild.me).has("VIEW_CHANNEL"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios para reproducir la música!**\n${client.emotes.waring} | **Permiso requerido:** \`VIEW_CHANNEL\``
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/ecUiHLM.gif")
        );

      if (!channelXD.permissionsFor(message.guild.me).has("CONNECT"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios para reproducir la música!**\n${client.emotes.waring} | **Permiso requerido:** \`CONNECT\``
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/mfSw6AH.gif")
        );

      if (!channelXD.permissionsFor(message.guild.me).has("SPEAK"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios para reproducir la música!**\n${client.emotes.waring} | **Permiso requerido:** \`SPEAK\``
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/HvpTEzD.gif")
        );

      if (
        args.join(" ").toLowerCase().includes("spotify") &&
        args.join(" ").toLowerCase().includes("track")
      ) {
        getPreview(args.join(" ")).then((result) => {
          client.distube
            .play(message, result.title)
            .catch((err) =>
              message.reply(
                `${client.emotes.error} | **${err.name}:** ${err.message}`,
                { split: { char: "", maxLength: 1999 } }
              )
            );
        });
      } else if (
        args.join(" ").toLowerCase().includes("spotify") &&
        args.join(" ").toLowerCase().includes("playlist")
      ) {
        getTracks(args.join(" ")).then((result) => {
          message
            .reply(
              `${client.emotes.error} | **No puedo reproducir playlist de spotify!**`
            )
            .catch(() => {});
        });
      } else {
        client.distube.play(message, string);
      }
    } catch (e) {
      message.reply(
        `${client.emotes.error} | **${err.name}:** ${err.message}`,
        { split: { char: "", maxLength: 1999 } }
      );
    }
  }
};
