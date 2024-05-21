const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

const run = async (client, interaction) => {
    const componentsForInviteLink = new MessageActionRow().addComponents(
        new MessageButton()
        .setStyle("LINK")
        .setURL('https://discord.com/oauth2/authorize?client_id=888630502691594290&permissions=1239299655752&scope=bot%20applications.commands')
        .setLabel('Invite KNguyen')
        .setEmoji('<:linkbutmspaint:944946423848398908>')
    )

    const helpEmbed = new MessageEmbed()
    .setColor("#00ad1d")
    .setTitle("Invite KNguyen")
    .setDescription("Click the invite button below to invite KNguyen to your server!")

    interaction.reply({embeds: [helpEmbed], components: [componentsForInviteLink]})
}

module.exports = {
    name: "invite",
    description: "The bot invite link",
    run: run
}