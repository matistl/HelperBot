const Discord = require("discord.js");

module.exports = class FilterCommand extends require("../../Class/Command") {
    constructor(client) {
        super(client, {
            name: "filter",
            aliases: [],
            description: "Activa o desactiva los filtros para la música",
            usage: "filter <list | filter-name>",
            dirname: __dirname,
            date: "Domingo, 2 de mayo de 2021",
            botPermissions: 0,
            userPermissions: 0,
            cooldown: 4,
            nsfw: false,
            args: true,
            dev: false,
            enable: true,
        });
    }
    async run(message, args) {
        const client = this.client;
        const prefix = await client.getPrefix(message);
        try {
            const queue = client.distube.getQueue(message);

            if (!message.member.voice.channel)
                return message.reply(
                    `${client.emotes.error} | **Debes estar en un canal de voz para usar este comando.**`
                );

            if (
                message.guild.me.voice.channel &&
                message.member.voice.channel.id !== message.guild.me.voice.channel.id
            )
                return message.reply(
                    `${client.emotes.error} | **No estas en el mismo canal que yo.**`
                );

            if (!queue)
                return message.reply(
                    `${client.emotes.error} | **No hay canciones en la lista.**`
                );

            if (!args[0])
                return message.reply(
                    `${client.emotes.error} | **Especifica que filtro quieres activar.** \`${prefix}filterlist\``
                );

            // if (args[0] === "list" || "List") {
            //     const filtros1 = client.filters.slice(0, 9).join("\n");
            //     const filtros2 = client.filters.slice(10, 18).join("\n");
            //     const embedFiltros = new Discord.MessageEmbed()
            //         .setTitle("__**Lista de filtros**__")
            //         .addField("\u200b", filtros1, true)
            //         .addField("\u200b", filtros2, true)
            //         .setColor(client.colores.yellowColor);
            //     return message.reply(embedFiltros);
            // } else
                if (args[0] === "off" && queue.filter)
                    client.distube.setFilter(message, queue.filter);
                else if (Object.keys(client.distube.filters).includes(args[0]))
                    client.distube.setFilter(message, args[0]);
                else if (args[0])
                    return message.reply(
                        `${client.emotes.error} | **El filtro ingresado no es válido.** \`${prefix}filterlist\``
                    );
            message.reply(
                `${client.emotes.success} | **El filtro actual es:** \`${
                queue.filter || "Off"
                }\``
            );
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
