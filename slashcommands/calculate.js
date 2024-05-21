const float = require("float")
const { Parser } = require("expr-eval")
const { MessageEmbed } = require("discord.js")
const parser = new Parser()

const run = async (client, interaction) => {
    const expression = interaction.options.getString("expression")
    let parsed
    let answer
    let ranswer
    let doneEmbed
    try {
        parsed = parser.parse(expression)
        answer = parsed.evaluate({ pi: 3.1415926535, e: 2.7182818284 }).toFixed(2)
        ranswer = parsed.evaluate({ pi: 3.1415926535, e: 2.7182818284 })
        doneEmbed = new MessageEmbed()
        .setTitle(expression)
        .setDescription(`Calculated ${answer}\nRaw: ${ranswer}`)
        .setColor("#00ad1d")
        interaction.reply({ embeds: [doneEmbed] })
    } catch (e) {
        doneEmbed = new MessageEmbed()
        .setTitle("Error")
        .setDescription(e.message)
        .setColor("RED")
        interaction.reply({ embeds: [doneEmbed], ephemeral: true })
    }
}

module.exports = {
    name: "calculate",
    description: "Calculate a math expression",
    options: [{
        name: "expression",
        description: "The math expression you want to calculate",
        type: "STRING",
        required: true,
    }],
    run: run
}