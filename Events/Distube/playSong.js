module.exports = class playSong {
    constructor(distube) { }
    async run(message, queue, song) {
        let client = message.client;
        try {

            const embedPlay = new client.discord.MessageEmbed()
                // .setAuthor("🎵 | Playing", null, "https://discord.com/oauth2/authorize?client_id=761300013317488660&scope=bot&permissions=8")
                .setTitle(`${client.emotes.playing} | **Reproduciendo**`)
                .setDescription(`[${song.name}](${song.url}) [${song.formattedDuration}]`)
                .setFooter(song.user.username + "#" + song.user.discriminator, song.user.displayAvatarURL({ dynamic: true }))
                .setColor(client.colores.redColor);
            message.channel.send(embedPlay);

        } catch (e) {
            client.error({
                type: "event",
                name: "playSong",
                error: e,
                message
            })
        }
    }
};