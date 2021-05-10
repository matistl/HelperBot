const Discord = require("discord.js");

module.exports = class QueueCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "queue",
      aliases: ["q"],
      description: "Muestra la lista de canciones",
      usage: "queue",
      dirname: __dirname,
      date: "Jueves, ‎22‎ de ‎abril‎ de ‎2021",
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
        return message.reply(
          `〔 ${client.emotes.error} 〕**No hay canciones en la lista.**`
        );

      const q =
        queue.songs.length > 6
          ? queue.songs
              .map(
                (song, i) =>
                  `${i === 0 ? "**Reproduciendo:**" : `**\`${i}.\`**`} [${
                    song.name
                  }](${song.url}) - [\`${song.formattedDuration}\`]`
              )
              .slice(0, 6)
              .join("\n\n") +
            `\n\nY **${queue.songs.length - 6}** cancion(es) más...`
          : queue.songs
              .map(
                (song, i) =>
                  `${i === 0 ? "**Reproduciendo:**" : `**\`${i}.\`**`} [${
                    song.name
                  }](${song.url}) - [\`${song.formattedDuration}\`]`
              )
              .join("\n\n");
      const embedQueue = new Discord.MessageEmbed()
        .setTitle("> **Lista de canciones del servidor**")
        .setDescription(q)
        .setColor(client.colores.cyanColor)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.reply(embedQueue);
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
