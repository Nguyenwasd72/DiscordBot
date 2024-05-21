const ms = require('ms')

const run = async(client, interaction) => {
    const prize = interaction.options.getString('prize')
    const winnerCount = interaction.options.getInteger('winners')
    const duration = interaction.options.getString('duration')

    const { GiveawayCreator } = require('discord-giveaway')
    const Creator = new GiveawayCreator(client, require("./../secrets.json").mongodb)
    client.giveaways = Creator

    interaction.reply({ content: "Started the giveaway!", ephemeral: true })

    await client.giveaways.startGiveaway({
        prize: prize,
        channelId: interaction.channel.id,
        guildId: interaction.guild.id,
        duration: ms(duration),
        winners: winnerCount,
        hostedBy: interaction.user.id
    });
}

module.exports = {
    name: "gstart",
    description: "Starts a giveaway",
    options: [
        {
            name: "duration",
            description: "Duration of the giveaway",
            type: "STRING",
            required: true
        },
        {
            name: "winners",
            description: "Number of winners",
            type: "INTEGER",
            required: true
        },
        {
            name: "prize",
            description: "Prize of the giveaway",
            type: "STRING",
            required: true,
        }
    ],
    perms: "ADMINISTRATOR",
    run: run
}