module.exports = class PingCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["pong"],
      description: "Proporciona el ping del bot, de discord y de la base de datos",
      usage: "ping",
      dirname: __dirname,
      date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
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
      let date = Date.now();
      let ping_db = await new Promise((r, j) => {
        require("mongoose")
          .connection.db.admin()
          .ping((err, result) =>
            err || !result ? j(err || result) : r(Date.now() - date)
          );
      });
      const embedPing = new client.discord.MessageEmbed()
        .setDescription([
          `:ping_pong: | **Bot Ping:** ${client.ws.ping}ms`,
          `:satellite: | **Discord API Ping:** ${Date.now() - message.createdTimestamp}ms`,
          `:card_box: | **DataBase Ping:** ${await ping_db}ms`,
        ])
        .setColor(client.colores.fuchsiaColor);
      message.channel.send(embedPing);
    } catch (e) {
      client.error({
        name: this.info.name,
        error: e,
        type: "command",
        message,
      });
    }
  }
};
