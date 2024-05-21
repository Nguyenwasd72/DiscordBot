const moment = require("moment")
const { MessageEmbed } = require("discord.js")

const run = async (client, interaction, args) => {
    const user = interaction.options.getUser("user") || interaction.user
    const member = interaction.guild.members.cache.get(user.id)
    const memberRole = member.roles.cache.filter((roles) => roles.id !== interaction.guild.id).map((role) => role.toString())

    const userinfoembed = new MessageEmbed()
    .setColor('#00ad1d')
    .setTitle(`${user.username}'s info`)
    .addField("User Tag", `#${user.discriminator}`, true)
    .addField("User ID", user.id, true)
    .addField("Created Account at", moment.utc(user.createdAt).format('llll'), true)
    .addField("Joined Server at", moment.utc(member.joinedAt).format('llll'), true)
    .addField("Nickname here", member.nickname || "None", true)
    .addField("Roles", `${member.roles.cache.size - 1} roles: ${memberRole.join(", ")}`, true)

    interaction.reply({embeds: [userinfoembed]})
}

module.exports = {
    name: "userinfo",
    description: "Shows you someone user information",
    options: [{
        name: "user",
        description: "The person you want to know their information",
        type: "USER",
        required: false,
    }],
    run: run
}