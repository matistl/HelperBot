module.exports = class addSong {
    constructor(client) {
        this.client = client;
    }
    async run(message, queue, song) {
        let client = this.client;
        try {

            const embedAddSong = new client.discord.MessageEmbed()
                // .setAuthor("➕ | Song Added", null, "https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8")
                .setTitle(`${client.emotes.add} | **Canción Añadida**`)
                .setDescription(`[${song.name}](${song.url}) [${song.formattedDuration}]`)
                .setFooter(song.user.username + "#" + song.user.discriminator, song.user.displayAvatarURL({ dynamic: true }))
                .setColor(client.colores.dodgerBlueColor);
            message.channel.send(embedAddSong);

        } catch (e) {
            client.error({
                type: 'event',
                name: 'addSong',
                error: e,
                message
            });
        }
    }
};