const Discord = require("discord.js");

module.exports = class SkipCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "skip",
      aliases: ["s"],
      description: "Salta una canción",
      usage: "skip",
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

      if (
        message.member.voice.channel.members.filter((x) => !x.user.bot).size ===
        1
      ) {
        message.reply(`${client.emotes.success} | **La canción fue saltada.**`);
        await client.distube.skip(message);
        return;
      }

      const map = client.skipvote;
      const mapload = map.get(message.guild.id);

      if (mapload) {
        const embed = new Discord.MessageEmbed()
          .setDescription(`\`${message.author.username}\` **ya has votado.**`)
          .setColor(client.colores.redColor);
        if (mapload.users.includes(message.author.id))
          return message.channel.send(embed);
        await mapload.users.push(message.author.id);

        if (mapload.users.length > 1) {
          let skipNumber =
            1 +
            parseInt(
              message.member.voice.channel.members.filter((x) => !x.user.bot)
                .size / 2
            );
          const embedXD = new Discord.MessageEmbed()
            .setDescription(
              `\`${message.author.username}\` **ha votado para saltar la canción.** \`(${mapload.users.length}/${skipNumber})\``
            )
            .setColor(client.color);
          message.channel.send(embedXD);
        }

        const number = parseInt(
          message.member.voice.channel.members.filter((x) => !x.user.bot).size /
            2
        );

        if (mapload.users.length < number) return;
        const embedUwU = new Discord.MessageEmbed()
          .setDescription(
            `${client.emotes.success} | **La canción actual fue saltada.**`
          )
          .setColor(client.colores.magentaColor);
        message.channel.send(embedUwU);

        await client.distube.skip(message);
        await client.skipvote.delete(message.guild.id);
      } else {
        const listUser = {
          users: [],
        };
        await map.set(message.guild.id, listUser);
        await listUser.users.push(message.author.id);

        let skipNumber = parseInt(
          message.member.voice.channel.members.filter((x) => !x.user.bot).size /
            2
        );
        const embedYaNoSe = new Discord.MessageEmbed()
          .setDescription(
            `\`${
              message.author.username
            }\` **ha iniciado una votación para saltar la canción.** \`(1/${
              skipNumber + 1
            })\``
          )
          .setColor(client.colores.yellowColor);
        return message.channel.send(embedYaNoSe);
      }
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
