module.exports = class finish {
    constructor(distube) { }
    async run(message) {
        let client = message.client;

        try {

            const embedFinisQueue = new client.discord.MessageEmbed()
                .setDescription(`${client.emotes.warning} | **No hay más canciones en la cola! Dejando el canal de voz...**`)
                .setColor("#FFFF00")
            message.channel.send(embedFinisQueue);

        } catch (e) {
            client.error({
                type: 'event',
                name: 'finish',
                error: e,
                message
            });
        }
    }
};
