const Discord = require("discord.js");
const canvacord = require("canvacord");
const isHexcolor = require("is-hexcolor");
const Canvas = require("canvas");
const GetColorName = require("hex-color-to-color-name");

module.exports = class ColorCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "color",
      aliases: ["c"],
      description: "Muestra el color ingresado",
      usage: "color <hex-color>",
      dirname: __dirname,
      date: "Sábado, 1 de mayo de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 4,
      nsfw: false,
      args: false,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      let hexColor = args[0];

      if (!hexColor)
        return message.reply(
          `${client.emotes.error} | **Ingresa un color Hexadecimal.**`
        );
      let color = hexColor.replace(/#+/g, "");
      let no = isHexcolor(`#${color}`);

      if (!no)
        return message.reply(
          `${client.emotes.error} | **Ingresa un color Hexadecimal válido.**`
        );

      await canvacord.Canvas.color(`#${color}`);

      const colorName = GetColorName.GetColorName(`#${color}`);
      Canvas.registerFont("./Util/Fonts/CascadiaCodePL-Light.ttf", {
        family: "Cascadia Code",
      });

      let canvas = Canvas.createCanvas(500, 500);
      let ctx = canvas.getContext("2d");
      ctx.fillStyle = `#${color}`;
      ctx.fillRect(0, 0, 500, 500);
      ctx.font = "50px Cascadia Code";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(capi(colorName).join(" "), 240, 200);
      let att = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "ColorHelperBot.png"
      );

      const embedColor = new Discord.MessageEmbed()
        .setImage("attachment://ColorHelperBot.png")
        .attachFiles(att)
        .setColor(`#${color}`)
        .setDescription(
          `> **HEX:** #${color} | **RGB:** ${
            require("color-to-name").hexToRGB(`#${color}`).r
          }, ${require("color-to-name").hexToRGB(`#${color}`).g}, ${
            require("color-to-name").hexToRGB(`#${color}`).b
          }`
        );
      message.reply(embedColor);
    } catch (e) {
      // console.error(e)
        client.error({
          name: this.information.name,
          error: e,
          type: "command",
          message: message,
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
