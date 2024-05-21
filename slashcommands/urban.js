const { MessageEmbed } =  require("discord.js")
const urban = require("urban")

const run = async (client, interaction) => {
    const search = interaction.options.getString("search") ? urban(interaction.options.getString("search")) : urban.random()
    try {
        search.first(res => {
            if (!res) return interaction.reply("No results found")
            const { word, definition, example, thumbs_up, thumbs_down, permalink, author } = res
            const urbanEmbed = new MessageEmbed()
            .setColor("#00ad1d")
            .setTitle(`Urban Dictionary | ${word}`)
            .setURL(permalink || "https://www.urbandictionary.com")
            .setDescription(`**Definition:** ${definition || "No definition (u wot m8)"}\n\n**Example:** ${example || "No example (bruv realy)"}`)
            .addField("<:upvote:950277274480029746>", `${thumbs_up} _ _`, true)
            .addField("<:downvote:970940885619593316>", `${thumbs_down} _ _`, true)
            .setFooter({text: `Author: ${author}`})
            interaction.reply({embeds: [urbanEmbed]})
        })
    } catch (err) {
        if (err) {
            interaction.reply(`A wild "${err}" has appeared`)
        }
    }
}

module.exports = {
    name: "urban",
    description: "Search a word in Urban Dictionary",
    options: [{
        name: "search",
        description: "The search bar",
        type: "STRING",
        required: false,
    }],
    run: run
}