const { MessageEmbed } = require("discord.js")

const run = async (client, interaction) => {
    const helpEmbed = new MessageEmbed()

    .setColor("#00ad1d")
    .setTitle("Commands list")
    .setDescription("Here are the commands:")
    .setFields(
        {name: "🔖 Info:", value: "`info`, `invite`, `help`, `ping`"},
        {name: "🎁 Giveaway:", value: "`gstart`, `gend`, `greroll`"},
        {name: "🎪 Fun:", value: "`basketball`, `football`, `fight`, `flip`, `guessthenumber`, `kill`, `rps`"},
        {name: "🖼️ Image:", value: "`stonks`, `notstonks`, `bed`, `delete`, `slap`, `trigger`, `gay`, `presentation`"},
        {name: "🎟️ Misc:", value: "`avatar`, `eval`, `dadjoke`, `urban`, `randomgif`, `remind`, `weather`"},
        {name: "🏡 Server:", value: "`annouce`, `membercount`, `nuke`, `poll`, `userinfo`"}
    )
    interaction.reply({embeds: [helpEmbed]})
}

module.exports = {
    name: "help",
    description: "All the bot commands",
    run: run
}