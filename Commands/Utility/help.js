module.exports = class HelpCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "help",
      aliases: ["h"],
      description:
        "Da los comandos del bot y proporciona información sobre un comando",
      usage: "help",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: 19456,
      userPermissions: 2048,
      cooldown: 3,
    });
  }
  async run(message, args) {
    let client = this.client;
    try {
      let prefix = await client.getPrefix(message);
      const cmd =
        client.commands.get(args[0]) ||
        client.commands.find((c) => c.information.aliases.includes(args[0]));
      if (cmd) {
        const embedHelpCommand = new client.discord.MessageEmbed()
          .setTitle(`__**Comando ${capi(cmd.information.name)}**__`)
          .setThumbnail(client.user.displayAvatarURL())
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(cmd.information.description || "No hay descripción")
          .addField("**Información del comando:**", [
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
          .addField("**Permisos necesarios:**", [
            `**\`Usuario (BitField):\`** ${
              cmd.configuration.userPermissions ||
              "El usuario no requiere permisos"
            }`,
            `**\`Bot (BitField):\`** ${
              cmd.configuration.botPermissions || "El bot no requiere permisos"
            }`,
          ])
          .addField("**Otra Información:**", [
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
          .setFooter(
            "Leyenda: <> = Necesario | () = Opcional | Recuerda no incluirlos al usar el comando"
          )
          .setColor("#FFFF00");
        return message.channel.send(embedHelpCommand);
      }
      const Utility = client.commands
        .filter((x) => x.information.category == "Utility")
        .map((z) => "`" + z.information.name + "`")
        .join(" ");
      const Configuration = client.commands
        .filter((x) => x.information.category == "Configuration")
        .map((z) => "`" + z.information.name + "`")
        .join(" ");
      const Music = client.commands
        .filter((x) => x.information.category == "Music")
        .map((z) => "`" + z.information.name + "`")
        .join(" ");

      const embedCommands = new client.discord.MessageEmbed()
        .setTitle("__**Comandos del bot**__")
        .addField("**Música:**", Music)
        .addField("**Utilidad:**", Utility)
        .addField("**Configuración:**", Configuration)
        .setColor(client.colores.greenColor);
      message.channel.send(embedCommands);
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
