const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");

module.exports = class BotInfoCommand extends require("../../Class/Command") {
    constructor(client) {
        super(client, {
            name: "botinfo",
            aliases: ["stats", "bot"],
            description: "Da la información sobre el bot",
            usage: "botinfo",
            dirname: __dirname,
            date: "Miércoles, ‎21‎ de ‎abril‎ de ‎2021",
            botPermissions: 347136,
            userPermissions: 3072,
            cooldown: 5,
            nsfw: false,
            args: false,
            dev: false,
            enable: true,
        });
    }
    async run(message, args) {
        const client = this.client;
        const prefix = await client.getPrefix(message);
        try {
            const usagePercent = require("util").promisify(
                require("cpu-stat").usagePercent
            );
            const porcentaje = await usagePercent();
            const dev = await client.users.cache.get("723158623404032022");
            const actividad = moment
                .duration(client.uptime)
                .format(" D [Días], H [Horas], m [Minutos], s [Segundos]");
            const embedBotInfo = new Discord.MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor(client.colores.fuchsiaColor)
                .setTitle(`__**Información de ${client.user.username}**__`)
                .setDescription([
                    `**\`Tag:\`** ${client.user.tag}`,
                    `**\`ID:\`** ${client.user.id}`,
                    `**\`Mención:\`** <@!${client.user.id}>`,
                    `**\`Creación del bot:\`** ${client.user.createdAt
                        .toUTCString()
                        .substr(0, 16)}`,
                    `**\`Número de comandos:\`** ${client.commands.size}`,
                    `**\`Developer:\`** [${dev.tag}](https://github.com/TheEaterOfSouls)`,
                    `**\`Conexiones a voz:\`** ${client.voice.connections.size}`,
                    `**\`Prefix default:\`** h!`,
                    `**\`Prefix personalizado:\`** ${await client.getPrefix(message) ? prefix : "No hay"}`,
                    `**\`Ping:\`** ${client.ws.ping}`,
                ])
                .addField("__**Otra Información:**__", [
                    `**\`Lenguaje de programación:\`** JavaScript`,
                    `**\`Versión del bot:\`** 1.0.0 (Beta)`,
                    `**\`Uptime:\`** ${actividad}`,
                    `**\`Modelo del CPU:\`** ${os.cpus()[0].model}`,
                    `**\`Uso del CPU:\`** ${porcentaje.toFixed(2)}%`,
                    `**\`Plataforma:\`** ${os
                        .platform()[0]
                        .toUpperCase()}${os.platform().slice(1)}`,
                    `**\`Memoria:\`** ${(
                        process.memoryUsage().heapUsed /
                        1024 /
                        1024
                    ).toFixed(2)} MB`,
                ], true)
                .addField("__**Estadisticas:**__", [
                    `**\`Usuarios:\`** ${client.guilds.cache
                        .reduce((c, v) => c + v.memberCount, 0)
                        .toLocaleString()}`,
                    `**\`Servidores:\`** ${client.guilds.cache.size}`,
                    `**\`Canales:\`** ${client.channels.cache.size}`,
                    `**\`Emojis:\`** ${client.emojis.cache.size}`,
                ], true)
                .addField(
                    "__**Enlaces:**__",
                    "[Mi invitación](https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=4265078231)\n[Servidor de soporte](https://discord.gg/b4s2kQwVm8)\n[Top.gg](https://top.gg/bot/761300013317488660/vote)\n[BotsForDiscord](https://botsfordiscord.com/bot/761300013317488660/vote)", true
                )
                .setThumbnail(client.user.displayAvatarURL())
            // .setFooter(
            //   message.author.tag,
            //   message.author.displayAvatarURL({ dynamic: true })
            // );
            message.reply(embedBotInfo);
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
