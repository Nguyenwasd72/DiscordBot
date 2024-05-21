const run = async (client, interaction) => {
    const ownerId = "884019263160062002"
    if (interaction.user.id != ownerId) return interaction.reply({ content: "403", ephemeral: true })
    
    const msg_id = interaction.options.getString("message_id")
    const msg_to_edit = interaction.options.getString("message")
    botMsg = await interaction.channel.messages.fetch(msg_id)
    botMsg.edit(msg_to_edit)
    interaction.reply({ ephemeral: true, content: "Edited" })
}

module.exports = {
    name: "editmsg",
    description: "devOnly",
    options: [
        {
            name: "message_id",
            description: "ID of the message",
            type: "STRING",
            required: true
        },
        {
            name: "message",
            description: "The message to edit",
            type: "STRING",
            required: true
        }
    ],
    run: run
}