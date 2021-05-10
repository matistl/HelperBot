const Discord = require("discord.js");
const commandSetup = require("../../Util/Models/commandSetup.js");

module.exports = class EnabledCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "enabled",
      aliases: [],
      description: "Hablita o deshabilita un comando en el servidor",
      usage: "enabled <command-name> <true | false>",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: null,
      userPermissions: 8,
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
      const commandName = args[0];
      const commandStatus = args[1];
      if (!message.member.permissions.has(8)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `〔 ${client.emotes.error} 〕**No tienes el permiso necesario.**\n〔 ${client.emotes.warning} 〕 | **Permiso requerido:** \`ADMINISTRATOR\`.`
          )
          .setImage("https://i.imgur.com/mcqbxZJ.gif")
          .setColor(client.colores.redColor);
        return message.reply(embed);
      }
      if (!commandName)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar el nombre del comando el cual quieres habilitar o deshabilitar.**`
        );
      if (!client.commands.has(commandName))
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes ingresar un comando válido.**`
        );
      if (!commandStatus)
        return message.reply(
          `〔 ${
            client.emotes.error
          } 〕**Debes ingresar un estado válido.**\nUsa: \`${await client.getPrefix(
            message
          )}help ${this.information.name}\``
        );
      if (commandName === this.information.name)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No puedes deshabilitar ese comando.**`
        );
      switch (commandStatus) {
        case "true":
          await commandSetup.findOne(
            { guildID: message.guild.id, commandName: commandName },
            async (err, data) => {
              if (err) throw err;
              if (!data) {
                message.reply(
                  `〔 ${client.emotes.error} 〕**Ese comando no esta deshabilitado.**`
                );
              } else {
                await commandSetup.findOneAndDelete({
                  guildID: message.guild.id,
                  commandName: commandName,
                });
                message.reply(
                  `〔 ${client.emotes.success} 〕**El comando fue hablitado correctamente.**`
                );
              }
            }
          );
          break;
        case "false":
          await commandSetup.findOne(
            { guildID: message.guild.id, commandName: commandName },
            async (err, data) => {
              if (err) throw err;
              if (data) {
                message.reply(
                  `〔 ${client.emotes.error} 〕**Ese comando ya esta deshabilitado.**`
                );
              } else {
                let xdddd = new commandSetup({
                  guildID: message.guild.id,
                  commandName: commandName,
                  commandEnable: false,
                });
                xdddd.save();
                message.reply(
                  `〔 ${client.emotes.success} 〕**El comando fue deshablitado correctamente.**`
                );
              }
            }
          );
          break;
        default:
          message.reply(
            `〔 ${
              client.emotes.error
            } 〕**Debes ingresar un estado válido.**\nUsa: \`${await client.getPrefix(
              message
            )}help ${this.information.name}\``
          );
          break;
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
