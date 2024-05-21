const run = async(client, interaction) => {
    const ownerId = "884019263160062002"
    if (interaction.user.id != ownerId) return interaction.reply({ content: "403", ephemeral: true })

    const msg = interaction.options.getString("message")
    interaction.reply({ content: "Sent", ephemeral: true })
    interaction.channel.send(msg)
}

module.exports = {
    name: "say",
    description: "devOnly",
    options: [{
        name: "message",
        description: "Message",
        type: "STRING",
        required: true,
    }],
    run: run
}