const Discord = require("discord.js");

module.exports = class HelpCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "help",
      aliases: ["h"],
      description:
        "Da los comandos del bot y proporciona información sobre un comando",
      usage: "help <command | category>",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: 19456,
      userPermissions: 2048,
      cooldown: 3,
      enable: true,
    });
  }
  async run(message, args) {
    let client = this.client;
    try {
      const prefix = await client.getPrefix(message);
      const cmd =
        client.commands.get(args[0]) ||
        client.commands.find((c) => c.information.aliases.includes(args[0]));
      if (cmd) {
        let pU;
        const permisosUser = cmd.configuration.userPermissions || 0;
        if (permisosUser === 0) {
          pU = "No requiere Permisos";
        } else {
          pU = Markdown(
            new Discord.Permissions(permisosUser || 0).toArray().join(", ")
          );
        }
        let pB;
        const permisosBot = cmd.configuration.botPermissions || 0;
        if (permisosBot === 0) {
          pB = "No requiere Permisos";
        } else {
          pB = Markdown(
            new Discord.Permissions(permisosBot || 0).toArray().join(", ")
          );
        }
        // const pB = new Discord.Permissions(permisosBot).toArray().join(", ");
        const embedHelpCommand = new client.discord.MessageEmbed()
          .setTitle(`__**Comando ${capi(cmd.information.name)}**__`)
          .setThumbnail(client.user.displayAvatarURL())
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(cmd.information.description || "No hay descripción")
          .addField("> **Información del comando:**", [
            `**\`Nombre del comando:\`** ${cmd.information.name}`,
            `**\`Aliases del comando:\`** ${
              cmd.information.aliases.join(", ") || "No hay aliases"
            }`,
            `**\`Categoria del comando:\`** ${cmd.information.category}`,
            `**\`Uso del comando:\`** ${prefix}${cmd.information.usage}`,
            `**\`Cooldown del comando:\`** ${cmd.information.cooldown}s`,
            `**\`Fecha de creación del comando:\`** ${
              cmd.information.date || "No se proporcionó fecha"
            }`,
          ])
          .addField("> **Otra Información:**", [
            `**\`Solo canales NSFW:\`** ${
              cmd.configuration.nsfw ? "Sí" : "No"
            }`,
            `**\`Requiere Argumentos:\`** ${
              cmd.configuration.args ? "Sí" : "No"
            }`,
            `**\`Solo para el Developer:\`** ${
              cmd.configuration.dev ? "Sí" : "No"
            }`,
            `**\`Habilitado:\`** ${cmd.configuration.enable ? "Sí" : "No"}`,
          ])
          .addField("> **Permisos necesarios:**", [
            `**\`Usuario:\`** ${pU || "No require permisos"}`,
            `**\`Bot:\`** ${pB || "No require permisos"}`,
          ])
          .setFooter(
            "<> » Necesario | () » Opcional | Recuerda no incluirlos al usar el comando"
          )
          .setColor("#FFFF00");
        return message.channel.send(embedHelpCommand);
      }
      const Utility = client.commands
        .filter((x) => x.information.category == "Utility")
        .map((z) => "`" + z.information.name + "`")
        .join(", ");
      const Configuration = client.commands
        .filter((x) => x.information.category == "Configuration")
        .map((z) => "`" + z.information.name + "`")
        .join(", ");
      const Music = client.commands
        .filter((x) => x.information.category == "Music")
        .map((z) => "`" + z.information.name + "`")
        .join(", ");
      const NSFW = client.commands
        .filter((x) => x.information.category == "NSFW")
        .map((z) => "`" + z.information.name + "`")
        .join(", ");
      const Moderation = client.commands
        .filter((x) => x.information.category == "Moderation")
        .map((z) => "`" + z.information.name + "`")
        .join(", ");
      const Fun = client.commands
        .filter((x) => x.information.category == "Fun")
        .map((z) => "`" + z.information.name + "`")
        .join(", ");
      const Suggestions = client.commands
        .filter((x) => x.information.category == "Suggestions")
        .map((z) => "`" + z.information.name + "`")
        .join(", ");
      if (!args[0]) {
        const embedCommands = new Discord.MessageEmbed()
          .setDescription([
            `Aquí están todas las categorías de comandos disponibles, ejecute \`${prefix}help <category>\` para ver la lista de comandos de la categoría.`,
            ``,
            `Ejecute \`${prefix}help <command>\` para obtener ayuda e información de como usar el comando.`,
          ])
          .addField("> **Categorías:**", [
            `🎵 Music`,
            `⚔️ Moderation`,
            `✨ Utility`,
            `🤣 Fun`,
            `⚙️ Configuration`,
            `📬 Suggestions`,
            `🔞 NSFW`,
            ``,
            `**[Vota](https://top.gg/bot/761300013317488660/vote) | [Invítame](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=4265078231) | [Soporte](https://discord.gg/b4s2kQwVm8)**`,
          ])
          .setColor(client.colores.yellowColor)
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          );
        return message.reply(embedCommands);
      }
      switch (args[0]) {
        case "music":
        case "Music":
          {
            const embedMúsica = new Discord.MessageEmbed()
              .setTitle("🎵 | Comandos de Música:")
              .setDescription(Music)
              .setColor(client.color);
            message.reply(embedMúsica);
          }
          break;
        case "moderation":
        case "Moderation":
          {
            const embedModeración = new Discord.MessageEmbed()
              .setTitle("⚔️ | Comandos de Moderación:")
              .setDescription(Moderation)
              .setColor(client.colores.redColor);
            message.reply(embedModeración);
          }
          break;
        case "utility":
        case "Utility":
          {
            const embedUtilidad = new Discord.MessageEmbed()
              .setTitle("✨ | Comandos de Utilidad:")
              .setDescription(Utility)
              .setColor(client.colores.salmonColor);
            message.reply(embedUtilidad);
          }
          break;
        case "fun":
        case "Fun":
          {
            const embedFun = new Discord.MessageEmbed()
              .setTitle("🤣 | Comandos de Diversión:")
              .setDescription(Fun)
              .setColor(client.colores.cyanColor);
            message.reply(embedFun);
          }
          break;
        case "config":
        case "Config":
          {
            const embedConfiguración = new Discord.MessageEmbed()
              .setTitle("⚙️ | Comandos de Configuración:")
              .setDescription(Configuration)
              .setColor(client.colores.magentaColor);
            message.reply(embedConfiguración);
          }
          break;
        case "suggestions":
        case "Suggestions":
          {
            const embedSuggestions = new Discord.MessageEmbed()
              .setTitle("📬 | Comandos de Sugerencias:")
              .setDescription(Suggestions)
              .setColor(client.colores.silverColor);
            message.reply(embedSuggestions);
          }
          break;
        case "NSFW":
        case "nsfw":
          {
            const embedNSFW = new Discord.MessageEmbed()
              .setTitle(
                `${message.channel.nsfw ? "🔞" : "🚫"} | Comandos de NSFW:`
              )
              .setDescription(
                message.channel.nsfw
                  ? NSFW
                  : "Debes utilizar este comando en un canal **NSFW** para ver esta sección."
              )
              .setColor(client.colores.magentaColor);
            message.reply(embedNSFW);
          }
          break;
        default:
          const embedCommands2 = new Discord.MessageEmbed()
            .setDescription([
              `Aquí están todas las categorías de comandos disponibles, ejecute \`${prefix}help <category>\` para ver la lista de comandos de la categoría.`,
              ``,
              `Ejecute \`${prefix}help <command>\` para obtener ayuda e información de como usar el comando.`,
            ])
            .addField("> **Categorías:**", [
              `🎵 Music`,
              `⚔️ Moderation`,
              `✨ Utility`,
              `🤣 Fun`,
              `⚙️ Configuration`,
              `📬 Suggestions`,
              `🔞 NSFW`,
              ``,
              `**[Vota](https://top.gg/bot/761300013317488660/vote) | [Invítame](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=4265078231) | [Soporte](https://discord.gg/b4s2kQwVm8)**`,
            ])
            .setColor(client.colores.yellowColor)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            );
          message.reply(embedCommands2);
          break;
      }
    } catch (e) {
      client.error({
        error: e,
        message: message,
        type: "command",
        name: this.information.name,
      });
    }
  }
};

function capi(x) {
  if (typeof x !== "string") return;
  let y = x.split(" ");
  let z = y[0].charAt(0).toUpperCase() + y[0].slice(1).toLowerCase();
  if (y[1]) {
    let a = y[1].charAt(0).toUpperCase() + y[1].slice(1).toLowerCase();
    return [z, a];
  } else {
    return [z];
  }
}

function Markdown(str) {
  return `\`\`\`ml\n${str}\n\`\`\``;
}
