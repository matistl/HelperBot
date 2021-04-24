module.exports = class searchResult {
    constructor(client) {
        this.client = client;
    }
    async run(message, result) {
        let client = this.client;
        try {

            let i = 0;
            const embedSerachResuls = new client.discord.MessageEmbed()
                .setTitle(`**Elije una opcción**`)
                .setDescription(`${result.map(song => `**\`${++i}]\`** ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
                .setColor("#5D00FF")
                .setFooter("You only have 60 seconds", client.user.displayAvatarURL());
            message.channel.send(embedSerachResuls).then((msg) => {
                setTimeout(() => {
                    embedSerachResuls.setTitle("")
                    embedSerachResuls.setFooter("", "")
                    embedSerachResuls.setDescription(`${client.emotes.warning} | **El tiempo se acabó!**`)
                    embedSerachResuls.setColor("#5D00FF")
                    msg.edit(embedSerachResuls);
                }, 60000)
            });

        } catch (e) {
            client.error({
                type: 'event',
                error: e,
                name: 'searchResult',
                message
            });
        }
    }
};
