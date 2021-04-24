const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");

module.exports = class NameCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "botinfo",
      aliases: ["stats", "bot"],
      description: "Da la información sobre el bot",
      usage: "botinfo",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: 347136,
      userPermissions: 3072,
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
      const usagePercent = require("util").promisify(
        require("cpu-stat").usagePercent
      );
      const porcentaje = await usagePercent();
      const dev = await client.users.cache.get("723158623404032022");
      const actividad = moment
        .duration(client.uptime)
        .format(" D [Días], H [Horas], m [Minutos], s [Segundos]");
      const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        // .setAuthor("Mi Información", client.user.displayAvatarURL())
        .addField(
          "**Programación:**",
          "```js\n» Lenguaje: JavaScript\n» Librería: Discord.js ^12.5.3\n» Comandos Totales: " +
            client.commands.size +
            "\n» Prefix Default: h!\n» Prefix perzonalizado: " +
            (await client.getPrefix(message)) +
            "\n```"
        )
        .addField(
          "**Sistema:**",
          "```js\n» Plataforma: " +
            os.platform()[0].toUpperCase() +
            "" +
            os.platform().slice(1) +
            "\n» Uptime: " +
            actividad +
            "\n» Memoria: " +
            (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
            "mb\n» Uso del CPU: " +
            porcentaje.toFixed(2) +
            "%\n```"
        )
        .addField(
          "**Enlaces:**",
          "[Mi invitación](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=4265078231) | [Servidor de soporte](https://discord.gg/b4s2kQwVm8)\n[Top.gg](https://top.gg/bot/761300013317488660/vote) | [BotsForDiscord](https://botsfordiscord.com/bot/761300013317488660/vote)"
        )
        .setColor(client.colores.fuchsiaColor)
        .setFooter(
          `Developer: ${dev.tag}`,
          dev.displayAvatarURL({ dynamic: true })
        );
      message.channel.send(embed);
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
