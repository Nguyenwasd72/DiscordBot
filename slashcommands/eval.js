const { MessageEmbed } = require("discord.js")

const run = async(client, interaction) => {
    const clean = async (client, text) => {
        if (text && text.constructor.name == "Promise") text = await text
        if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 })
        text = text.replace(client.token, "You tried. ✨")
        return client, text
    }
    try {
        var code = interaction.options.getString("code")
        var evaled = eval(code)
        var cleaned = await clean(client, evaled)

        const description = `📥 Input:\n\`\`\`js\n${code}\n\`\`\`\n📤 Output:\n\`\`\`js\n${cleaned}\n\`\`\``

        const evaledEmbed = new MessageEmbed()
        .setTitle("Evaled")
        .setDescription(description.length > 4096 ? `📥 Input:\n\`\`\`js\n${code}\n\`\`\`\n📤 Output:\n\`\`\`js\n${4096 - 40 - code.length}\n\`\`\`` : description)
        .setColor("#00ad1d")

        await interaction.reply({ embeds: [evaledEmbed] })
    } catch (err) {
        interaction.reply({ embeds: [new MessageEmbed().setTitle("Evaled").setDescription(`📥 Input:\n\`\`\`js\n${code}\n\`\`\`\n📤 Output:\n\`\`\`js\n${cleaned}\n\`\`\``).setColor("#00ad1d")] })
    }
}

module.exports = {
    name: "eval",
    description: "Eval code",
    options: [{
        name: "code",
        description: "The code to eval",
        type: "STRING",
        required: true
    }],
    run: run
}