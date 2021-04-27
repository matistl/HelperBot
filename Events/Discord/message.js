const cooldown = new Set();
const cooldownBlacklist = new Set();
const cooldownNoCommandFound = new Set();
const Discord = require("discord.js");
const ms = require("ms");
const prefixSchema = require("../../Util/Models/prefix.js");
const commandSetup = require("../../Util/Models/commandSetup.js");

module.exports = class Message {
  constructor(client) {
    this.client = client;
  }
  async run(message) {
    let client = this.client;
    try {
      const blacklist = require("../../Util/Models/blacklist.js");
      client.getPrefix = async function (message) {
        if (!message.guild) return;
        let custom;

        const Data = await prefixSchema
          .findOne({ Guild: message.guild.id })
          .catch((err) => console.log(err));

        if (Data) {
          custom = Data.Prefix;
        } else {
          custom = "h!";
        }
        return custom;
      };

      //Argumentos
      if (!message.guild) return;
      let prefix = await client.getPrefix(message);
      if (message.author.bot) return;
      if (message.channel.type === "dm") return;
      if (!message.content.startsWith(prefix)) return;
      if (message.content === prefix) return;
      // if (!message.content.startsWith(prefix)) {

      //     if (cooldown.has(message.author.id)) return;

      //     cooldown.add(message.author.id)

      //     setTimeout(() => {
      //         cooldown.delete(message.author.id);
      //     }, 10000)//10s

      //     await client.xpcord.giveXP(message.author.id, message.guild.id, Math.floor(Math.random() * 9) + 1, message)
      //     return;
      // }

      //Comando y argumentos
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd =
        client.commands.get(command) ||
        client.commands.find((c) => c.information.aliases.includes(command));
      try {
        if (
          !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")
        )
          return message.author
            .send(
              `${client.emotes.error} | **No tengo el permiso de enviar mensajes!**\n${client.emotes.warning} | **Servidor:** \`${message.guild.name}\``
            )
            .catch(() => {});
      } catch (error) {
        message.author
          .send(
            `${client.emotes.error} | **No tengo el permiso de envia mensajes!**\n${client.emotes.warning} | **Servidor:** \`${message.guild.name}\``
          )
          .catch(() => {});
      }
      try {
        if (
          !message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")
        )
          return message
            .reply(
              `${client.emotes.error} | **No tengo el permiso de enviar embeds!**\n${client.emotes.warning} | **Permiso Requerido:** \`EMBED_LINKS\``
            )
            .catch(() => {});
      } catch (error) {
        message
          .reply(
            `${client.emotes.error} | **No tengo el permiso de envia embeds!**\n${client.emotes.warning} | **Permiso Requerido:** \`EMBED_LINKS\``
          )
          .catch(() => {});
      }
      let blacklist1 = await blacklist.findOne({ ID: message.author.id });
      if (!cmd) {
        if (cooldownNoCommandFound.has(message.author.id)) return;
        cooldownNoCommandFound.add(message.author.id);
        setTimeout(() => {
          cooldownNoCommandFound.delete(message.author.id);
        }, 15000);
        const embedNoCMD = new Discord.MessageEmbed()
          .setTitle(`${client.emotes.error} | **Acceso Desconocido**`)
          .setDescription([
            "El comando ingresado no existe. Asegúrate de que este escrito correctamente!",
            `Usa: \`${await client.getPrefix(
              message
            )}help\` para obtener la lista de comandos!`,
          ])
          .setColor("#FF0000");
        return message.reply(embedNoCMD);
      } else if (blacklist1) {
        if (cooldownBlacklist.has(message.author.id)) return;
        cooldownBlacklist.add(message.author.id);
        setTimeout(() => {
          cooldownBlacklist.delete(message.author.id);
        }, 15000); //15s
        const embed = new Discord.MessageEmbed()
          .setTitle(`${client.emotes.error} | **Acceso Denegado**`)
          .setDescription(
            "Te encuentras en la blacklist, por lo tanto, no puedes usar mis comandos!"
          )
          .addField("**Información:**", [
            `**\`Usuario:\`** ${message.author.tag}`,
            `**\`Razón:\`** ${blacklist1.Reason || "No hay razón"}`,
            `**\`Autor:\`** ${client.users.cache.get(blacklist1.Author).tag}`,
            `**\`Tiempo:\`** ${ms(Date.now() - blacklist1.Date)}`,
          ])
          .addField(
            "**¿Deseas apelar?**",
            `Pudes intentar apelar la sanción en el [Servidor de soporte](https://discord.gg/b4s2kQwVm8)`
          )
          .setColor("#FF0000");
        return message.channel.send(embed);
      }

      //Condiciones v2
      let { enable } = cmd.configuration;
      if (!enable)
        return message.channel.send(
          `${client.emotes.error} | **El comando esta deshabilitado por el developer!**`
        );

      async function comandoActivado(message, command) {
        if (!message.guild) return;

        let data = await commandSetup
          .findOne({
            guildID: message.guild.id,
            commandName: command.information.name,
          })
          .catch((err) => console.log(err));
        if (!data) return true;
        return data.commandEnable;
      }

      if (!(await comandoActivado(message, cmd)))
        return message.channel.send(
          `${client.emotes.error} | **El comando esta deshablitado en el servidor!**`
        );

      /*&& !["723158623404032022"].includes(message.author.id)*/
      //Cooldown
      var id =
        message.author.id +
        cmd.information.name +
        cmd.information.aliases.join(" ");
      const time = cmd.information.cooldown;
      const humanizeDuration = require("humanize-duration");
      if (cooldown.has(id)) {
        const embedCooldown = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `🕒 | **Por favor, espera \`${humanizeDuration(time + "000", {
              language: "es",
            })}\` para volver a usar ese comando!**`
          );
        return message.channel.send(embedCooldown);
      }

      cooldown.add(id);
      if (cmd) cmd.run(message, args);
      setTimeout(() => {
        cooldown.delete(id);
      }, time + "000");
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "message",
      });
    }
  }
};
