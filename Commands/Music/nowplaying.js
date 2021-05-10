const Discord = require("discord.js");

module.exports = class NameCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      aliases: ["np"],
      description: "Muestra información sobre la canción en reproducción",
      usage: "nowplaying",
      dirname: __dirname,
      date: "Jueves, ‎22‎ de ‎abril‎ de ‎2021",
      botPermissions: 19456,
      userPermissions: 3072,
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
      let queue = client.distube.getQueue(message);

      if (!message.member.voice.channel)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes estar en un canal de voz para usar este comando.**`
        );

      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return message.reply(
          `〔 ${client.emotes.error} 〕**No estas en el mismo canal que yo.**`
        );

      if (!queue)
        return message.channel.send(
          `〔 ${client.emotes.error} 〕**No hay canciones en la lista.**`
        );

      let track = queue.songs[0];
      const embedNp = new Discord.MessageEmbed()
        .setTitle(`__**${track.name}**__`)
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(client.color)
        .setThumbnail(
          client.distube.getQueue(message).songs[0].info.videoDetails
            .thumbnails[0].url
        )
        .setDescription([
          "> **Información de la canción:**",
          `**\`Título:\`** ${track.name}`,
          `**\`Autor:\`** __[${
            client.distube.getQueue(message).songs[0].info.videoDetails.author
              .name
          }](${
            client.distube.getQueue(message).songs[0].info.videoDetails.author
              .channel_url
          })__`,
          `**\`Upload:\`** ${
            client.distube.getQueue(message).songs[0].info.videoDetails
              .uploadDate
          }`,
          `**\`Link:\`** __[Click aquí](${track.url})__`,
          `**\`Vistas:\`** ${track.views.toLocaleString()}`,
          `**\`Likes:\`** ${track.likes.toLocaleString()}`,
          `**\`Dislikes:\`** ${track.dislikes.toLocaleString()}`,
          `**\`Pedida por:\`** ${
            track.user.username + "#" + track.user.discriminator
          }`,
          `**\`Duración:\`** ${queue.formattedCurrentTime}/${track.formattedDuration}`,
        ]);
      message.reply(embedNp);
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
