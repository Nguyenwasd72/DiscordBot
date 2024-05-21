const { MessageEmbed } = require("discord.js")

const run = async (client, interaction) => {
    const EmbedMoment = new MessageEmbed()

    .setTitle(":table_tennis: Pong!")
    .setDescription(`Bot Latency is ${Date.now() - interaction.createdTimestamp} ms, API Latency is ${Math.round(client.ws.ping)} ms`)
    .setColor('#00ad1d')
    interaction.reply({embeds: [EmbedMoment]})
}

module.exports = {
    name: "ping",
    description: "The bot latency",
    run: run
}