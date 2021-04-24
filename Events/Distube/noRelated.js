module.exports = class noRelated {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
        let client = this.client;

        try {

            const embedNoRelated = new client.discord.MessageEmbed()
                .setDescription(`${client.emotes.warning} | **No encontré ninguna canción!**`)
                .setColor("#FFFF00");
            message.channel.send(embedNoRelated);

        } catch (e) {
            client.error({
                type: 'event',
                name: 'noRelated',
                error: e,
                message
            });
        }
    }
};
