const { MessageEmbed } = require("discord.js");
const PrefixSchema = require("./Models/prefix.js");
const modLogs = require("./Models/logs.js");
const suggestions = require("./Models/suggestions.js");
const codeSuggest = require("./Models/suggestCode.js");

const Functions = {
  getPrefix: async function (message) {
    if (!message.guild) return;
    let custom;

    const Data = await PrefixSchema.findOne({
      Guild: message.guild.id,
    }).catch((err) => console.log(err));

    if (Data) {
      custom = Data.Prefix;
    } else {
      custom = "h!";
    }
    return custom;
  },
  modlogs: async function ({ Member, Action, Reason, Color }, message) {
    const embedModLogs = new MessageEmbed()
      .setAuthor(
        `${message.author.tag} (${message.author.id})`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription([
        `**\`Miembro:\`** ${Member.user.tag} \`(${Member.id})\``,
        `**\`Acción:\`** ${Action}`,
        `**\`Razón:\`** ${Reason || "No hay razón."}`,
      ])
      .setFooter(
        `${new Date().toLocaleString("en-US", {
          timeZone: "America/Merida",
        })}`
      )
      .setThumbnail(Member.user.displayAvatarURL({ dynamic: true }))
      .setColor(Color);
    await Member.send(embedModLogs).catch(() => {});
    const data = await modLogs.findOne({ guildID: message.guild.id });
    if (!data) return;
    const channel = await message.guild.channels.cache.get(data.channelID);
    await channel.send(embedModLogs).catch(() => {});
  },
  getSuggestionChannel: async function (
    { Suggest, Color, Code, Status },
    message
  ) {
    const embedSuggestion = new MessageEmbed()
      .setAuthor(
        `${message.author.tag} | Nueva sugerencia`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(Suggest)
      .addField("> **Estado:**", Status)
      .setColor(Color)
      .setFooter(
        `Código: ${Code} | ${new Date().toLocaleString("en-US", {
          timeZone: "America/Merida",
        })}`
      );
    const data = await suggestions.findOne({ guildID: message.guild.id });
    if (!data) return;
    const channel = await message.guild.channels.cache.get(data.channelID);
    await channel
      .send(embedSuggestion)
      .then(async (msg) => {
        const newData = new codeSuggest({
          suggestCode: Code,
          suggestChannelID: msg.channel.id,
          suggestMessageID: msg.id,
        });
        await newData.save();
        msg.react("836408773877956669");
        msg.react("836408158120837180");
      })
      .catch(() => {});
  },
};
module.exports = Functions;
