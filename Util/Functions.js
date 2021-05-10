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
      // .setAuthor(
      //   `${message.author.tag} | Nueva sugerencia`,
      //   message.author.displayAvatarURL({ dynamic: true })
      // )
      .setTitle("> **Sugerencia:**")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(Suggest)
      .addField("> **Información:**", [
        `**\`Código:\`** ${Code}`,
        `**\`Estado:\`** ${Status}`,
        `**\`Sugerente:\`** ${message.author.tag} **(${message.author.id})**`,
      ])
      .setColor(Color)
      .setFooter(
        `${message.guild.name} | ${new Date().toLocaleString("en-US", {
          timeZone: "America/Merida",
        })}`,
        message.guild.iconURL({ dynamic: true })
      );
    const data = await suggestions.findOne({ guildID: message.guild.id });
    if (!data) return;
    const channel = await message.guild.channels.cache.get(data.channelID);
    await channel
      .send(embedSuggestion)
      .then(async (msg) => {
        const newData = new codeSuggest({
          suggestCode: Code,
          suggestAuthor: message.author.id,
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
