const Discord = require("discord.js");

module.exports = class NukeCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "nuke",
      aliases: [],
      description:
        "Clona un canal dejandolo vacio pero con las mismas configuraciones.",
      usage: "nuke (mention-channel)",
      dirname: __dirname,
      date: "Viernes, 7 de mayo de 2021",
      botPermissions: 27664,
      userPermissions: 3088,
      cooldown: 5,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const permisosUser = message.member.permissions.has("MANAGE_CHANNELS");
      const permisosBot = message.guild.me.permissions.has("MANAGE_CHANNELS");
      const channelXD = message.channel;
      if (!permisosUser) {
        const embed = new Discord.MessageEmbed()
          .setDescription([
            `${client.emotes.error} | **No tienes el permiso necesario.**`,
            `${client.emotes.warning} | **Permiso requerido:** \`MANAGE_CHANNELS\`**.**`,
          ])
          .setColor(client.colores.redColor)
          .setImage("https://i.imgur.com/LZPcRAy.gif");
        return message.reply(embed);
      }
      if (!permisosBot) {
        const embed = new Discord.MessageEmbed()
          .setDescription([
            `${client.emotes.error} | **No tengo el permiso necesario.**`,
            `${client.emotes.warning} | **Permiso requerido:** \`MANAGE_CHANNELS\`**.**`,
          ])
          .setColor(client.colores.redColor)
          .setImage("https://i.imgur.com/LZPcRAy.gif");
        return message.reply(embed);
      }
      if (!message.guild.channels.cache.get(channelXD.id))
        return message.reply(
          `${client.emotes.error} | **El canal mencionado debe ser de este servidor.**`
        );

      if (channelXD.type !== "text")
        return message.reply(
          `${client.emotes.error} | **Debes mencionar únicamente a canales de texto.**`
        );

      if (!channelXD.permissionsFor(message.guild.me).has("VIEW_CHANNEL"))
        return message.reply(
          new Discord.MessageEmbed()
            .setDescription(
              `${client.emotes.error} | **No tengo los permisos necesarios en el canal mencionado.**\n${client.emotes.waring} | **Permiso requerido:** \`VIEW_CHANNEL\`.`
            )
            .setColor(client.colores.redColor)
            .setImage("https://i.imgur.com/ecUiHLM.gif")
        );
      await message.guild.channels.cache
        .get(channelXD.id)
        .clone()
        .then((ch) => {
          ch.setParent(message.channel.parent.id);
          ch.setPosition(message.channel.position);
          ch.setTopic(message.channel.topic);
          ch.setNSFW(message.channel.nsfw);
          ch.setRateLimitPerUser(message.channel.rateLimitPerUser);
          message.channel.delete();

          const embedChNuked = new Discord.MessageEmbed()
            .setDescription(`<#${ch.id}> **fue nukeado.**`)
            .setColor(client.color);
          ch.send(embedChNuked);
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
