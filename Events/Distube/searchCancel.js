module.exports = class searchCancel {
    constructor(client) {
        this.client = client;
    }
    async run(message) {
        let client = this.client;
        try {

            message.channel.send(`${client.emotes.success} | **Busqueda cancelada!**`);

        } catch (e) {
            client.error({
                type: 'event',
                name: 'searchCancel',
                error: e,
                message
            });
        }
    }
};
