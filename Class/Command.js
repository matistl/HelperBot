class Command {
    constructor(client, {
        name = null,
        aliases = [],
        description = null,
        usage = null,
        dirname = null,
        date = null,
        botPermissions = null,
        userPermissions = null,
        cooldown = 0,
        nsfw = false,
        args = false,
        dev = false,
        enable = true,
    }) {
        this.client = client
        const category = dirname ? dirname.split(client.sep)[parseInt(dirname.split(client.sep).length - 1, 10)] : 'Unknown';
        this.information = {
            name,
            aliases,
            description,
            usage,
            cooldown,
            category,
            date
        }
        this.configuration = {
            botPermissions,
            userPermissions,
            nsfw,
            args,
            dev,
            enable
        }
    }
};

module.exports = Command;