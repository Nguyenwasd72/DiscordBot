const run = async (client, interaction) => {
    const { GiveawayCreator } = require('discord-giveaway')
    const Creator = new GiveawayCreator(client, require("./../secrets.json").mongodb)
    client.giveaways = Creator
    
    const giveaway_id = interaction.options.getString('giveaway_id')
    const rerolled = await client.giveaways.rerollGiveaway(giveaway_id)
        
    if (!rerolled) {
        return interaction.reply({ content: "The giveaway hasn't ended yet", ephemeral: true })
    }
    else {
	    interaction.reply({ content: "Rerolled the giveaway", ephemeral: true })
    }
}

module.exports = {
    name: "greroll",
    description: "Reroll a giveaway",
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