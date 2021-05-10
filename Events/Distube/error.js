module.exports = class error {
    constructor(client) {
        this.client = client;
    }
    async run(message, err) {
        let client = this.client;

        try {

            message.reply(
                `${client.emotes.error} | **${err.name}:** ${err.message}`,
                { split: { char: "", maxLength: 1999 } }
            );

        } catch (e) {
            client.error({
                type: 'event',
                name: 'error',
                error: e,
                message
            });
        }
    }
};
