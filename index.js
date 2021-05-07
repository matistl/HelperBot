const Helper = require("./Class/Client.js");
const { MessageEmbed } = require("discord.js");
const prefixSchema = require("./Util/Models/prefix.js");
const modLogs = require("./Util/Models/logs.js");

const client = new Helper({
  ws: {
    intents: 32511,
  },
  allowedMentions: {
    parse: [],
  },
  partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER"],
  fetchAllMembers: true,
});
client.devs = ["507367752391196682", "723158623404032022"];
const DisTube = require("distube");
const Read = require("util").promisify(require("fs").readdir);
const mongoose = require("mongoose");
const { config } = require("dotenv");
config();
const inicio = async () => {
  try {
    //Funciones
    client.getPrefix = async function (message) {
      if (!message.guild) return;
      let custom;

      const Data = await prefixSchema
        .findOne({ Guild: message.guild.id })
        .catch((err) => console.log(err));

      if (Data) {
        custom = Data.Prefix;
      } else {
        custom = "h!";
      }
      return custom;
    };

    client.modlogs = async function (
      { Member, Action, Reason, Color },
      message
    ) {
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
    };

    client.answers = [
      "Sí",
      "No",
      "Tal vez",
      "Posiblemente",
      "Excelente",
      "Claramente que sí",
      "Claramente que no",
      "Definitivamente no",
      "Definitivamente sí",
      "Lamentable",
      "...",
      "¿Te sientes bien?",
      "Seguramente",
      "Yo te apoyo",
      "Yo no te apoyo",
      "Consigue novia",
      "Consigue novio",
      "Lo detesto",
      "Por supuesto",
      "Horrible",
      "Hermoso",
      "Hermosa",
      "Sin palabras",
      "Hoy",
      "Mañana",
      "Nunca",
      "Siempre",
      "Jamás",
      "Increíble",
    ];

    //Lista
    const Commands = await Read("./Commands");
    const Events = await Read("./Events/Discord");

    //Comandos
    Commands.forEach(async (cmds) => {
      let commands = await Read("./Commands/" + cmds);
      commands
        .filter((cmd) => cmd.split(".").pop() === "js")
        .forEach(async (cmd) => {
          let log = await client.cargador("./Commands/" + cmds, cmd);
          if (log) console.log(log);
        });
    });

    //Eventos
    Events.forEach((e) => {
      e = e.split(".");
      client.on(e[0], (...args) =>
        new (require(`./Events/Discord/${e[0]}.js`))(client).run(...args)
      );
      console.log(`✔️ | El evento ${e[0]} cargó con éxito!`);
    });

    //XP
    const { EasyXPCord } = require("easy-xpcord");
    client.xpcord = new EasyXPCord({
      uri: process.env.MONGO,
    });
    client.xpcord.connect().then(() => {
      console.log("✔️ | Conectado a EasyXPCord!");
    });

    //Log
    const log = await client.login(process.env.DISCORD_TOKEN);
    if (log) console.log("✔️ | Cliente listo!");

    //Mongoose
    await mongoose.connect(
      process.env.MONGO,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      (error) => {
        if (error) return console.error(error);
        console.log("✔️ | Conectado a la base de datos!");
      }
    );

    //DisTube
    client.distube = new DisTube(client, {
      emitNewSongOnly: true,
      searchSongs: false,
      leaveOnStop: true,
      leaveOnFinish: true,
      leaveOnEmpty: true,
      youtubeDL: true,
      youtubeCookie: process.env.YOUTUBE_COOKIE,
      customFilters: {
        cursed: "vibrato=f=6.5,tremolo,aresample=48000,asetrate=48000*1.25",
        "8d": "apulsator=hz=0.075",
        lowbass: "bass=g=6",
        treble: "treble=g=5",
        normalizer: "dynaudnorm=f=200",
        clear: "dynaudnorm=f=200",
      },
    });

    await client.eventosDis("./Events/Distube");
  } catch (e) {
    console.log(e);
  }
};
inicio();
