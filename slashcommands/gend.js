const run = async (client, interaction) => {
    const { GiveawayCreator } = require('discord-giveaway')
    const Creator = new GiveawayCreator(client, require("./../secrets.json").mongodb)
    client.giveaways = Creator

    const giveaway_id = interaction.options.getString('giveaway_id')
    const ended = await client.giveaways.endGiveaway(giveaway_id)
        
    if (!ended) {
        return interaction.reply({ content: "The giveaway has already ended", ephemeral: true })
    }
    else {
        interaction.reply({ content: "Ended the giveaway", ephemeral: true })
    }
}

module.exports = {
    name: "gend",
    description: "End a giveaway",
    options: [
        {
            name: "giveaway_id",
            description: "ID of the giveaway",
            type: "STRING",
            required: true
        }
    ],
    perms: "ADMINISTRATOR",
    run: run
}