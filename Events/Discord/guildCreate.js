const Discord = require("discord.js");

module.exports = class guildCreate {
  constructor(client) {
    this.client = client;
  }
  async run(guild) {
    const client = this.client;
    try {
      const embedNewGuilds = new Discord.MessageEmbed()
        .setTitle(
          `**${client.emotes.add} | ${client.user.username} fue añadido a un servidor**`
        )
        .setDescription([
          `**\`Nombre:\`** ${guild.name}`,
          `**\`Server ID:\`** ${guild.id}`,
          `**\`Fecha de creación:\`** ${guild.createdAt
            .toUTCString()
            .substr(0, 16)} (${checkDays(guild.createdAt)})`,
          `**\`Owner:\`** ${guild.owner.user.tag}`,
          `**\`Owner ID:\`** ${guild.ownerID}`,
        ])
        .addField(
          "**Estadisticas del servidor:**",
          [
            `**\`Miembros:\`** ${guild.memberCount}`,
            `**\`Roles:\`** ${guild.roles.cache.size}`,
            `**\`Roles:\`** ${guild.emojis.cache.size}`,
            `**\`Emojis:\`** ${guild.channels.cache.size}`,
          ],
          true
        )
        .addField(
          "**Mis estadisticas:**",
          [
            `**\`Usuarios:\`** ${client.guilds.cache
              .reduce((c, v) => c + v.memberCount, 0)
              .toLocaleString()}`,
            `**\`Servidores:\`** ${client.guilds.cache.size}`,
            `**\`Canales:\`** ${client.channels.cache.size}`,
            `**\`Emojis:\`** ${client.emojis.cache.size}`,
          ],
          true
        )
        .setThumbnail(guild.iconURL({ dynamic: true }) || null)
        .setColor(client.colores.dodgerBlueColor);
      await client.channels.cache
        .get("838978645149483028")
        .send(embedNewGuilds);
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "guildCreate",
      });
    }
  }
};

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return "Hace " + days + (days == 1 ? " día" : " días");
}
