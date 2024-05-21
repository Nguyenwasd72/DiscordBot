const { MessageEmbed } = require("discord.js")

const run = async ( client, interaction ) => {
    let list = ""
    client.guilds.cache.forEach(guild => {
        list = list.concat(`${guild.name} | ID: ${guild.id}\n`)
    })

    const ownerId = "884019263160062002"
    if (interaction.user.id != ownerId) return interaction.reply({ content: "403", ephemeral: true })

    const EmbedMoment = new MessageEmbed()
        .setThumbnail("https://i.imgur.com/vaDngim.jpg")
        .setTitle("Number of servers im currently in")
        .setDescription(`Im currently in ${client.guilds.cache.size} servers\n\n**List of all servers:**\n${list}`)
        .setColor('#00ad1d')

    interaction.reply({embeds: [EmbedMoment]})
}

module.exports = {
    name: "howmanyservers",
    description: "devOnly",
    run: run
}