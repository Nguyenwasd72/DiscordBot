const { MessageEmbed } = require("discord.js")

const run = async(client, interaction) => {
    const channel = interaction.channel

    const annouceEmbed = new MessageEmbed()
    .setTitle(`New Annoucement from ${interaction.user.username}`)
    .setDescription(interaction.options.getString("message"))
    .setTimestamp()
    .setColor('#00ad1d')

    interaction.reply({ content: "Created annoucement!", ephemeral: true })
    if (interaction.options.getString("ping") == "true") {
            channel.send({ content: '@everyone', embeds: [annouceEmbed] })
    } else {
            channel.send({ embeds: [annouceEmbed]})
    }
}

module.exports = {
    name: "announce",
    description: "Announce in the channel you're currently in something",
    perms: "MANAGE_GUILD",
    options: [
        {
            name: "message",
            description: "Message you want to annouce",
            type: "STRING",
            required: true
        },
        {
            name: "ping",
            description: "If you want to ping @everyone or not",
            choices: [{name: "true", value: "true"}, {name: "false", value: "false"}],
            type: "STRING",
            required: true
        }
    ],
    run: run
}