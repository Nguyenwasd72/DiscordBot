const { MessageEmbed } = require("discord.js")

const run = async (client, interaction) => {
    interaction.reply({ content: "Poll created! <a:ablobattention:492776678742032395>", ephemeral: true })

    const pollEmbed = new MessageEmbed()
    .setColor('#00ad1d')
    .setTitle("New poll created by " + interaction.user.username)
    .setDescription(interaction.options.getString("message"))
    const botMsg = await interaction.channel.send({embeds: [pollEmbed]})
    botMsg.react(client.emojis.cache.get("947864887881781309"))
    botMsg.react(client.emojis.cache.get("947864887936315422"))
}

module.exports = {
    name: "poll",
    description: "Makes a yes or no poll",
    perms: "MANAGE_MESSAGES",
    options: [{
        name: "message",
        description: "Message you want to make the yes or no poll",
        type: "STRING",
        required: true,
    }],
    run: run
}