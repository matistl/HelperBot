module.exports = class addList {
    constructor(client) {
        this.client = client;
    }
    async run(message, queue, playList) {
        const client = this.client;
        try {

            const embedAddList = new client.discord.MessageEmbed()
                // .setAuthor("➕ | playList Added", null, "https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8")
                .setTitle(`${client.emotes.add} | **playList Añadida**`)
                .setDescription(`[${playList.name}](${playList.url}) [**${playList.songs.length}** songs]`)
                .setFooter(playList.user.username + "#" + playList.user.discriminator, playList.user.displayAvatarURL({ dynamic: true }))
                .setColor(client.colores.dodgerBlueColor);
            message.channel.send(embedAddList);

        } catch (e) {
            client.error({
                type: 'event',
                name: 'addList',
                error: e,
                message
            });
        }
    }
};