const Discord = require("discord.js");
const Logs = require("../../Util/Models/logs.js");

module.exports = class MessageUpdate {
  constructor(client) {
    this.client = client;
  }
  async run(member) {
    const client = this.client;
    try {
      let ChannelLogs = await Logs.findOne({ guildID: member.guild.id });
      if (!ChannelLogs) return;

      const embedGuildMemberAdd = new Discord.MessageEmbed()
        .setAuthor(
          member.guild.name + " | Un usuario ha entrado al servidor",
          member.guild.iconURL({ dynamic: true })
        )
        .addField("**Información:**", [
          `**\`Usuario:\`** ${member.user.tag} | ${member.user.id}`,
          `**\`Creación de la cuenta:\`** ${member.user.createdAt
            .toLocaleString("en-US", {
              timeZone: "America/Merida",
            })
            .substr(0, 9)} (${checkDays(member.user.createdAt)})`,
        ])
        .setColor(client.colores.yellowColor);
      member.guild.channels
        .resolve(ChannelLogs.channelID)
        .send(embedGuildMemberAdd);
    } catch (e) {
      this.client.error({
        type: "event",
        error: e,
        name: "guildMemberAdd",
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
