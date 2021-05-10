const { Client, Collection, MessageEmbed } = require("discord.js");
const {
  getPrefix,
  modlogs,
  getSuggestionChannel,
} = require("../Util/Functions.js");
let leer = require("util").promisify(require("fs").readdir);

class Helper extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.skipvote = new Map();
    this.snipes = new Map();
    this.devs = [
      "507367752391196682",
      "723158623404032022",
      "342382341185994757",
    ];
    this.modlogs = modlogs;
    this.getPrefix = getPrefix;
    this.getSuggestionChannel = getSuggestionChannel;
    this.sep = require("path").sep;
    this.discord = require("discord.js");
    this.colores = require("../config.js").colores;
    this.emotes = require("../config.js").emotes;
    this.filters = require("../config.js").filters;
    this.color = "#2769FF";
  }

  message(data = { emoji: "red", razon: "Error", message }) {
    let { emoji, razon, message } = data;
    if (!emoji) emoji = "red";
    if (!razon) razon = "Unkown Error";
    if (!message) throw new TypeError("The message parameter is missing.");
    let mensaje = "";
    if (emoji === "red") mensaje += this.emotes.error;
    if (emoji === "green") mensaje += this.emotes.success;
    mensaje += ` **[ ${message.author.tag} ]** » `;
    if (razon) mensaje += razon;
    return mensaje;
  }
  error(data = { name: null, type: "command", error: null, message }) {
    let error = "Unknown error";
    if (!data.name)
      throw new Error(
        "Tienes que escribir el nombre del evento o del comando."
      );

    if (data.type === "command") {
      if (data.error) error = data.error;
      if (!data.message)
        throw new TypeError("Es necesario añadir el parámetro del mensaje.");
      //   console.error(error);

      //Error al servidor
      let embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`${this.emotes.error} | **Ocurrio un error inesperado**`)
        .setDescription(error.stack)
        .addField("**Información:**", [
          `**\`Comando:\`** ${data.name}`,
          `**\`Tipo:\`** Comando`,
          `**\`Fecha:\`** ${new Date().toLocaleString("en-US", {
            timeZone: "America/Merida",
          })}`,
        ])
        .addField(
          "**Reportalo en el servidor de soporte:**",
          "**`Invitación:`** [Click aquí](https://discord.gg/b4s2kQwVm8)"
        );
      data.message.reply(embed);

      //Log errores
      let embed2 = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`**${this.emotes.error} | Ocurrio un error inesperado**`)
        .setDescription(error.stack)
        .addField("__**Información:**__", [
          `**\`Comando:\`** ${data.name}`,
          `**\`Servidor:\`** ${data.message.guild.name}`,
          `**\`Autor:\`** ${data.message.author.tag}`,
          `**\`Autor ID:\`** ${data.message.author.id}`,
        ]);

      this.channels.resolve("829929587667894312").send(embed2);
    } else if (data.type === "event") {
      if (data.error) error = data.error;
      let embed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`**${this.emotes.error} | Ocurrio un error inesperado**`)
        .setDescription(`\`\`\`js\n${error.stack}\`\`\``)
        .addField("**Información:**", `**\`Evento:\`** ${data.name}`);
      this.channels.resolve("830278749940351006").send(embed);
    } else {
      //   console.error(error);
    }
  }

  async cargador(direccion, nombre) {
    try {
      let cmds = new (require(`.${direccion}${require("path").sep}${nombre}`))(
        this
      );
      cmds.configuration.direction = direccion;
      if (cmds.init) cmds.init(this);
      this.commands.set(cmds.information.name, cmds);
      cmds.information.aliases.forEach((alias) =>
        this.aliases.set(alias, cmds.information.name)
      );
    } catch (e) {
      console.error(e);
    }
  }
  async eventosDis(ruta) {
    let eventos = await leer(ruta);
    eventos.forEach((ev) => {
      ev = ev.split(".");
      this.distube.on(ev[0], (...args) =>
        new (require(`../Events/Distube/${ev[0]}.js`))(this).run(...args)
      );
      // console.log(`✔️ | El evento ${ev[0]} cargó con éxito!`);
    });
  }
}

module.exports = Helper;
