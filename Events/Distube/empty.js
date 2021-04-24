module.exports = class empty {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
        const client = this.client;
        try {

            const embedEmpty = new client.discord.MessageEmbed()
                .setDescription(`${client.emotes.warning} | **Canal vacio! Dejando el canal de voz...**`)
                .setColor("#FFFF00");
            message.channel.send(embedEmpty);

        } catch (e) {
            client.err({
                type: 'event',
                name: 'empty',
                error: e,
                message
            });
        }
    }
};