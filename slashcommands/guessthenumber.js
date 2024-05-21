const { MessageEmbed, Collection } = require("discord.js")
const wait = require('node:timers/promises').setTimeout;

const pickingEmbed = new MessageEmbed()
.setColor("#00ad1d")
.setTitle("Picking")
.setDescription("Picking a random number between 1 and 100...")

const pickDoneEmbed = new MessageEmbed()
.setColor("#00ad1d")
.setTitle("Picked done")
.setDescription("Type `/guessthenumber <number>` to guess the number")

const data = new Collection()
data.set("number", new Collection())
data.set("guesses", new Collection())

const run = async(client, interaction) => {
    var mes = interaction.options.getNumber("number")
    if (!data.get("number").get(interaction.user.id))
    {
        await interaction.reply({embeds: [pickingEmbed]})
        data.get("number").set(interaction.user.id, Math.floor((Math.random() * 99) + 1))
        guesses = 0;
        data.get("guesses").set(interaction.user.id, guesses)
        await wait(2000)
        await interaction.followUp({embeds: [pickDoneEmbed]})
    }
    else if(mes == data.get("number").get(interaction.user.id))
    {
        const winEmbed = new MessageEmbed()
        .setColor("#00ad1d")
        .setTitle("You win")
        .setDescription(`You got it! Only took ${guesses} tries.`)

        data.get("guesses").set(interaction.user.id, guesses+=1)
        interaction.reply({embeds: [winEmbed]});
        data.get("number").set(interaction.user.id, Math.floor((Math.random() * 99) + 1))
        guesses = 0;
        data.get("guesses").set(interaction.user.id, guesses)
    }
    else if(mes < data.get("number").get(interaction.user.id))
    {
        const MoreThanEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Wrong")
        .setDescription(`${mes} is too low`)
        //---------------------------------------
        interaction.reply({embeds: [MoreThanEmbed]});
        data.get("guesses").set(interaction.user.id, guesses+=1)
    }
    else if(mes > data.get("number").get(interaction.user.id))
    {
        const LessThanEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Wrong")
        .setDescription(`${mes} is too high`)
        //---------------------------------------
        interaction.reply({embeds: [LessThanEmbed]});
        data.get("guesses").set(interaction.user.id, guesses+=1)
    }
}

module.exports = {
    name: "guessthenumber",
    description: "Guess the number™",
    options: [{
        name: "number",
        description: "Guess the number from 1 to 100",
        type: "NUMBER",
        required: true,
    }],
    run: run
}