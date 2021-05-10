const Discord = require("discord.js");
const prefijo = require("../../Util/Models/prefix.js");
const logsMod = require("../../Util/Models/logs.js");
const Suggestions = require("../../Util/Models/suggestions.js");

module.exports = class SettingsCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "settings",
      aliases: [],
      description: "Muestra la confuguración del bot en el servidor",
      usage: "settings",
      dirname: __dirname,
      date: "Lunes, 10 de mayo de 2021",
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
      const data = await prefijo.findOne({ Guild: message.guild.id });
      const dataLogs = await logsMod.findOne({ guildID: message.guild.id });
      const dataSugg = await Suggestions.findOne({ guildID: message.guild.id });
      let poto;
      if (!data) {
        poto = "h! **(Default)**";
      } else {
        poto = `${data.Prefix} **(Custom)**`;
      }
      let mod;
      if (!dataLogs) {
        mod = "No está establecido";
      } else {
        mod = `<#${dataLogs.channelID}> **(${dataLogs.channelID})**`;
      }
      let sugg;
      if (!dataSugg) {
        sugg = "No está establecido";
      } else {
        sugg = `<#${dataSugg.channelID}> **(${dataSugg.channelID})**`;
      }
      const embedSettings = new Discord.MessageEmbed()
        .setTitle("> **Configuración del Bot en el servidor**")
        .setColor(client.color)
        .setDescription([
          `> **\`Prefix:\`**\n${await poto}`,
          `> **\`Mod Logs:\`**\n${await mod}`,
          `> **\`Suggestions Channel\`**\n${await sugg}`,
        ]);
      message.reply(embedSettings);
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
