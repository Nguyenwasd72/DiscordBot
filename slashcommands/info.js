const { MessageEmbed } = require("discord.js")

const run = async (client, interaction) => {
    const infoEmbed = new MessageEmbed()
    .setColor("#00ad1d")
    .setAuthor({ name: 'KNguyen', iconURL: 'https://i.imgur.com/vaDngim.jpg' })
    .setTitle("KNguyen's info")
    .setDescription("Here are the information of the bot:")
    .setFields(
    {name: "Creator:", value: "KNguyen#8442", inline: true},
    {name: "Used:", value: "[NodeJS 16.12.0](https://nodejs.org/en/blog/release/v16.12.0)", inline: true},
    {name: "Library:", value: "[discord.js v13](https://discord.js.org/#/docs/discord.js/stable/general/welcome)", inline: true}
    )

    interaction.reply({embeds: [infoEmbed]})
}

module.exports = {
    name: "info",
    description: "The bot information",
    run: run
}