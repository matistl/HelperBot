const Discord = require("discord.js");

module.exports = class NameCommand extends require("../../Class/Command") {
  constructor(client) {
    super(client, {
      name: "inrole",
      aliases: ["inr"],
      description: "Muestra A los usuarios con cierto rol",
      usage: "inrole <mention-role>",
      dirname: __dirname,
      date: "Viernes, 30 de abril de 2021",
      botPermissions: null,
      userPermissions: null,
      cooldown: 4,
      nsfw: false,
      args: true,
      dev: false,
      enable: true,
    });
  }
  async run(message, args) {
    const client = this.client;
    try {
      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]) ||
        message.guild.roles.cache.find((e) =>
          e.name.match(new RegExp(`${args[0]}`, "gi"))
        );

      if (!role)
        return message.reply(
          `〔 ${client.emotes.error} 〕**Debes mencionar un rol.**`
        );

      if (!message.guild.roles.cache.has(role.id))
        return message.reply(
          `〔 ${client.emotes.error} 〕**El rol debe ser de este servidor.**`
        );

      let i = 0;
      const membersxd = role.members
        .filter((x) => x.user.tag !== message.guild.id)
        .map((x) => `[${++i}] ${x.user.tag}`);
      if (!role.members.size)
        return message.reply(
          `〔 ${client.emotes.error} 〕**No hay ninguna persona con el rol.**`
        );
      const listaRoles =
        membersxd.length > 25
          ? `${membersxd.slice(0, 25).join("\n")}\n#Y ${
              membersxd.length - 25
            } miembros más`
          : membersxd.join("\n");

      function css(str) {
        return `\`\`\`css\n${str}\n\`\`\``;
      }
      const embedInRole = new Discord.MessageEmbed()
        .setTitle(
          `Miembros con el rol:\n\`${role.name}\` - \`${role.members.size}\``
        )
        .setDescription(css(listaRoles))
        .setColor(role.hexColor || "BLUE")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.reply(embedInRole);
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
