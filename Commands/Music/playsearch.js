const Discord = require("discord.js");

module.exports = class PlaySearchCommand extends (
  require("../../Class/Command")
) {
  constructor(client) {
    super(client, {
      name: "playsearch",
      aliases: ["search"],
      description: "Busca y te da a elegir una canción para reproducir",
      usage: "playsearch <song-name>",
      dirname: __dirname,
      date: "Viernes, ‎23‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 6,
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

      const channelXD = message.member.voice.channel;
      if (!channelXD.permissionsFor(message.guild.me).has("VIEW_CHANNEL"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios para reproducir la música.**\n${client.emotes.waring} | **Permiso requerido:** \`VIEW_CHANNEL\`**.**`
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/ecUiHLM.gif")
        );

      if (!channelXD.permissionsFor(message.guild.me).has("CONNECT"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios para reproducir la música.**\n${client.emotes.waring} | **Permiso requerido:** \`CONNECT\`**.**`
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/mfSw6AH.gif")
        );

      if (!channelXD.permissionsFor(message.guild.me).has("SPEAK"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios para reproducir la música.**\n${client.emotes.waring} | **Permiso requerido:** \`SPEAK\`**.**`
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/HvpTEzD.gif")
        );
      const search = args.join(" ");
      if (!search)
        return message.reply(
          `${client.emotes.error} | **Ingresa el nombre de la canción a buscar.**`
        );

      await client.distube.search(search).then((result) => {
        message.channel
          .send(
            `<:HelperBot_Youtube:832241586896109608> | **Buscando:** \`${search}\` **en YouTube.**`
          )
          .then(async (msg) => {
            let i = 0;
            setTimeout(() => {
              msg
                .delete()
                .catch((e) =>
                  message.reply(
                    `${client.emotes.error} | **${e.name}:** ${e.message}`,
                    { split: { char: "", maxLength: 1999 } }
                  )
                );
              const embedResults = new Discord.MessageEmbed()
                .setTitle(`__**Resultados de la busqueda**__`)
                .setDescription(
                  `${result
                    .map(
                      (song) => `**\`${++i}.\`** | [${song.name}](${song.url})`
                    )
                    .slice(0, 10)
                    .join("\n")}`
                )
                .setColor(client.colores.discordColor)
                .setAuthor(
                  message.author.tag,
                  message.author.displayAvatarURL({ dynamic: true })
                );
              msg.channel.send(embedResults);
            }, 3000);
            let am = await message.channel
              .awaitMessages((m) => m.author.id == message.author.id, {
                max: 1,
              })
              .then((a) => a.first());

            if (result[parseInt(am.content)])
              return client.distube.play(
                message,
                result[parseInt(am.content - 1)].url
              );
          })
          .catch((e) => {
            message.reply(
              `${client.emotes.error} | **${e.name}:** ${e.message}`,
              { split: { char: "", maxLength: 1999 } }
            );
          });
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
