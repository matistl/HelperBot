module.exports = class LoopCommand extends require("../../Class/Command") {
    constructor(client) {
        super(client, {
            name: "loop",
            aliases: ["lp"],
            description: "Habilita o deshabilita el modo repetición de canciones",
            usage: "loop <song | queue | off>",
            dirname: __dirname,
            date: "Domingo, 25 de abril de 2021",
            botPermissions: null,
            userPermissions: null,
            cooldown: 3,
            nsfw: false,
            args: true,
            dev: false,
            enable: true,
        });
    }
    async run(message, args) {
        const client = this.client;
        try {
            const serverQueue = client.distube.getQueue(message);
            if (!message.member.voice.channel)
                return message.reply(
                    `〔 ${client.emotes.error} 〕**Debes estar en un canal de voz para usar este comando.**`
                );

            if (
                message.guild.me.voice.channel &&
                message.member.voice.channel.id !== message.guild.me.voice.channel.id
            )
                return message.reply(
                    `〔 ${client.emotes.error} 〕**No estas en el mismo canal que yo.**`
                );
            if (!serverQueue)
                return message.reply(
                    `〔 ${client.emotes.error} 〕**No hay canciones en la lista.**`
                );
            let mode = null;
            switch (args[0]) {
                case "off":
                    mode = 0;
                    break;
                case "song":
                    mode = 1;
                    break;
                case "queue":
                    mode = 2;
                    break;
            }
            mode = client.distube.setRepeatMode(message, mode);
            mode = mode ? (mode === 2 ? "Repetir Queue" : "Repetir Song") : "Off";
            message.reply(
                `〔 ${client.emotes.success} 〕**Ahora el modo loop esta para:** \`${mode}\``
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
