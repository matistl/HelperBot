const Discord = require("discord.js");
const Logs = require("../../Util/Models/logs.js");

module.exports = class guildMemberRemove {
  constructor(client) {
    this.client = client;
  }
  async run(member) {
    const client = this.client;
    try {
      let ChannelLogs = await Logs.findOne({ guildID: member.guild.id });
      if (!ChannelLogs) return;
      const embedGuildMemberRemove = new Discord.MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(
          member.guild.name + " | Un usuario ha salido del servidor",
          member.guild.iconURL({ dynamic: true })
        )
        .setDescription([
          `**\`Usuario:\`** ${member.user.tag} | ${member.user.id}`,
          `**\`Creación de la cuenta:\`** ${member.user.createdAt
            .toLocaleString("en-US", {
              timeZone: "America/Merida",
            })
            .substr(0, 9)} (${checkDays(member.user.createdAt)})`,
          `**\`Fecha de unión:\`** ${member.joinedAt
            .toLocaleString("en-US", {
              timeZone: "America/Merida",
            })
            .substr(0, 9)} (${checkDays(member.joinedAt)})`,
        ])
        .addField(
          "**Roles:**",
          `${
            member.roles.cache
              .filter((x) => x.id !== member.guild.id)
              .map((x) => x.toString())
              .join(" | ") || "No tenía roles"
          }`
        )
        .setColor(client.colores.yellowColor);
      member.guild.channels
        .resolve(ChannelLogs.channelID)
        .send(embedGuildMemberRemove);
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "guildMemberRemove",
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
