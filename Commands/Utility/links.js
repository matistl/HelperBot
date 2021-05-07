module.exports = class LinksCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "links",
      aliases: ["invite", "inv"],
      description: "Proporciona enlaces útiles respecto al bot",
      usage: "links",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
      botPermissions: 84992,
      userPermissions: 2048,
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
      const embed = new client.discord.MessageEmbed()
        .setTitle(":link: | **Enlaces Útiles**")
        .setDescription([
          `[Mi invitación](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=4265078231)`,
          `[Servidor de soporte](https://discord.gg/b4s2kQwVm8)`,
          `[Top.gg](https://top.gg/bot/761300013317488660/vote)`,
          `[BotsForDiscord](https://botsfordiscord.com/bot/761300013317488660/vote)`,
        ])
        .setColor(client.colores.magentaColor);
      message.author
        .send(embed)
        .then(() => {
          message.reply(
            `${client.emotes.invite} | **Revisa tus mensajes directos.**`
          );
        })
        .catch((e) => {
          message.reply(embed);
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
