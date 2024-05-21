const { MessageEmbed } = require("discord.js")

const run = async (client, interaction) => {
    const totalCount = interaction.guild.memberCount
    var serverIcon = interaction.guild.iconURL();

    const memberCountEmbed = new MessageEmbed()
    .setColor('#00ad1d')
    .setAuthor({name: `${interaction.guild}`, iconURL: serverIcon})
    .setTitle(`Total members in ${interaction.guild}:`)
    .setDescription(`\`${totalCount}\` members are in ${interaction.guild}`)

    interaction.reply({embeds: [memberCountEmbed]})
}

module.exports = {
    name: "membercount",
    description: "Gives you how many members are there in this server",
    run: run
}