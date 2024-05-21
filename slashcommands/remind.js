const ms = require("ms")
const { MessageEmbed } = require("discord.js")

const run = async (client, interaction) => {
    const reminder = interaction.options.getString("content")
    const time = interaction.options.getString("time")

    const reminderEmbedSuccess = new MessageEmbed()
    .setColor("#00ad1d")
    .setTitle("Successfully setup reminder")
    .setDescription(`Setup reminder **${reminder}** for ${ms(ms(time), { long: true })}!`)

    if (time && reminder) {
        interaction.reply({embeds: [reminderEmbedSuccess]})
    }

    setTimeout(async function () {
        const reminderEndedEmbed = new MessageEmbed()
        .setColor("#00ad1d")
        .setTitle(`:alarm_clock: Reminder Alert!`)
        .setDescription(`${reminder}`)
        .setThumbnail("https://platinmods.com/attachments/rwfwucefffubul-x1mbv8xuzy0an1trbuvokdlaxl8vro-s180-png.232247/")

        if (time && reminder) interaction.channel.send({content: `<@${interaction.user.id}>`, embeds: [reminderEndedEmbed]})
    }, ms(time))
}

module.exports = {
    name: "remind",
    description: "Remind you something",
    options: [
        {
            name: "time",
            description: "Time to remind",
            type: "STRING",
            required: true,
        },
            {
            name: "content",
            description: "Content you want to remind",
            type: "STRING",
            required: true
            }
    ],
    run: run
}