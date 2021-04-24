module.exports = class addList {
    constructor(client) {
        this.client = client;
    }
    async run(message, queue, playList) {
        const client = this.client;
        try {

            const embedAddList = new client.discord.MessageEmbed()
                // .setAuthor("➕ | Playlist Added", null, "https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8")
                .setTitle(`${client.emotes.add} | **Playlist Añadida**`)
                .setDescription(`[${playlist.name}](${playlist.url}) [**${playlist.songs.length}** songs]`)
                .setFooter(playlist.user.username + "#" + playlist.user.discriminator, playlist.user.displayAvatarURL({ dynamic: true }))
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