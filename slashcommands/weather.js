const { MessageEmbed } = require("discord.js")
const weather = require("weather-js")

const run = async (client, interaction) => {
    const locat = interaction.options.getString("location")
    weather.find({ search: locat, degreeType: `C` }, function (error, result) {
        if (error) return interaction.reply(error)

        if (result === undefined || result.length === 0) return message.channel.send('Invalid location <:thonk:929617413018902558>')

        var current = result[0].current
        var location = result[0].location

        const exampleEmbed = new MessageEmbed()
            .setColor("#00ad1d")
            .setAuthor({ name: `Weather forecast for ${current.observationpoint}` })
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addField('TimeZone', `UTC ${location.timezone}`, true)
            .addField('Degree Type', 'Celcius', true)
            .addField('Temperature', `${current.temperature}°`, true)
            .addField('Wind', `${current.winddisplay}`, true)
            .addField('Feels Like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)

        interaction.reply({ embeds: [exampleEmbed] })
    })
}

module.exports = {
    name: "weather",
    description: "Gives you the weather at somewhere",
    options: [{
        name: "location",
        description: "The location you want to see the weather",
        type: "STRING",
        required: true,
    }],
    run: run
}