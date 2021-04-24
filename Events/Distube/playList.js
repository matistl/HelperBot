module.exports = class playList {
    constructor(client) {
        this.client = client;
    }
    async run(message, queue, playlist, song) {
        let client = this.client;
        try {

            const embedPlayList = new client.discord.MessageEmbed()
                // .setAuthor("🎵 | Playing Playlist", null, "https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8")
                .setTitle(`${client.emotes.playing} | **Reproduciendo Playlist**`)
                .setDescription(`[${playlist.name}](${playlist.url}) [**${playlist.songs.length}** songs]`)
                .setFooter(playlist.user.username + "#" + playlist.user.discriminator, playlist.user.displayAvatarURL({ dynamic: true }))
                .setColor(client.colores.redColor);
            message.channel.send(embedPlayList);

        } catch (e) {
            client.error({
                type: 'event',
                name: 'playList',
                error: e,
                message
            });
        }
    }
};
