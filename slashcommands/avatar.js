const { MessageEmbed } = require("discord.js")

const run = async (client, interaction) => {
    const OpTiOnS = interaction.options._hoistedOptions
    const user = (OpTiOnS.find((e) => e.name === "user") && OpTiOnS.find((e) => e.name === "user").member.user) || interaction.user
    const EmbedMoment = new MessageEmbed()

    .setImage(user.displayAvatarURL({dynamic: true}))
    .setTitle(`${user.username}'s avatar`)
    .setDescription("Avatar:")
    .setColor('#00ad1d')
    interaction.reply({ embeds: [EmbedMoment] })
    }

module.exports = {
    name: "avatar",
    description: "Gives you someone's avatar in this server",
    options: [{
        name: "user",
        description: "The person you want to show their avatar",
        type: "USER",
        required: false,
    }],
    run: run
}