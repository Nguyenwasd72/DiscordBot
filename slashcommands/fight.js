const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")

const atks = [
    "punch",
    "kick",
    "360 no scope",
    "slap",
    "smash"
]

const defs = [
    "increased",
    "upgraded"
]

const chance = ["yes", "yes", "yes", "yes", "yes", "no", "yes", "yes", "yes", "yes", "yes", "no", "yes", "yes", "yes", "yes", "yes"]

const run = async(client, interaction) => {
    const userF = interaction.options.getUser("user")

    let settings = {
        hp: 100,
        def: 0,
        minAtk: [6, 5, 4, 3, 2, 1],
        maxAtk: [19, 17, 14, 11, 9, 7],
        minDef: 3,
        maxDef: 7
    }
    
    let p1 = {
        id: interaction.user.id,
        hp: settings.hp,
        def: settings.def,
        turn: false
    }
    
    let p2 = {
        id: userF.id,
        hp: settings.hp,
        def: settings.def,
        turn: false
    }

    if (userF.id === interaction.user.id) interaction.reply("You can't play with yourself `(¬_¬)`")
    if (userF.bot) interaction.reply("Bots can't plays `(._.)`")

    if (userF.id !== interaction.user.id && !userF.bot) startFight(interaction, interaction.channel, interaction.user.id, userF.id)

    async function startFight(msg, ch, one, two) {
        const fightEmbed = new MessageEmbed()
            .setColor("#00ad1d")
            .setTitle("Fight!")
            .setDescription(`\`${interaction.user.username} starts a fight with ${userF.username}\``)
            .addField(`${interaction.user.username}`, `<:mcheart:999898645417701376> Health: ${p1.hp}/100\n<:mcshield:999899147870142535> Defend: ${p1.def}/30`, true)
            .addField(`${userF.username}`, `<:mcheart:999898645417701376> Health: ${p2.hp}/100\n<:mcshield:999899147870142535> Defend: ${p2.def}/30`, true)

        const rowsON = new MessageActionRow().addComponents(
            new MessageButton().setLabel("Attack").setStyle("PRIMARY").setCustomId("atk").setEmoji("999928283447697458"),
            new MessageButton().setLabel("Defend").setStyle("PRIMARY").setCustomId("def").setEmoji("999899147870142535"),
            new MessageButton().setLabel("Leave").setStyle("DANGER").setCustomId("leave").setEmoji("999933786135478312"),
        )

        const rowsOFF = new MessageActionRow().addComponents(
            new MessageButton().setLabel("Attack").setStyle("PRIMARY").setDisabled(true).setCustomId("datk").setEmoji("999928283447697458"),
            new MessageButton().setLabel("Defend").setStyle("PRIMARY").setDisabled(true).setCustomId("ddef").setEmoji("999899147870142535"),
            new MessageButton().setLabel("Leave").setStyle("DANGER").setDisabled(true).setCustomId("dleave").setEmoji("999933786135478312"),
        )
        
        msg.reply({ ephemeral: true, content: "Started the fight" })
        const botMsg = await msg.channel.send({ content: `<@${p1.id}>, your turn`, embeds: [fightEmbed], components: [rowsON] })

        first(ch, one, two)
        
        async function first(ch, one, two) {
            let nowF = ch.guild.members.cache.get(one)
            let next = ch.guild.members.cache.get(two)

            let filter = m => m.user.id === nowF.id
            let collector = ch.createMessageComponentCollector(filter)

            if (p1.turn === true) return
            p1.turn = true

            if (p1.hp <= 0) {
                return end(ch, one, two, two, one, "defeat");
            }

            collector.on("collect", async (m) => {
                if (m.user.id !== p1.id && m.user.id !== p2.id) {
                    return m.reply({ ephemeral: true, content: "This fight isn't for you" })
                } else if (m.user.id !== p1.id && m.user.id === p2.id) {
                    return m.reply({ ephemeral: true, content: "Not your turn yet" })
                }

                if (m.customId === "atk") {
                    let atkAmount
                    if (p2.def >= 0 && p2.def < 6) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[0] - settings.minAtk[0]) + settings.minAtk[0])}
                    if (p2.def >= 6 && p2.def < 10) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[1] - settings.minAtk[1]) + settings.minAtk[1])}
                    if (p2.def >= 10 && p2.def < 15) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[2] - settings.minAtk[2]) + settings.minAtk[2])}
                    if (p2.def >= 15 && p2.def < 19) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[3] - settings.minAtk[3]) + settings.minAtk[3])}
                    if (p2.def >= 19 && p2.def < 26) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[4] - settings.minAtk[4]) + settings.minAtk[4])}
                    if (p2.def >= 26 && p2.def <= 30) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[5] - settings.minAtk[5]) + settings.minAtk[5])}

                    let atkChance = Math.floor(Math.random() * chance.length)
                    if (chance[atkChance] === "yes") {
                        p2.hp -= atkAmount
                        p1.turn = false
                        await collector.stop()
                        fightEmbed.fields.find(f => f.name === `${userF.username}`).value = `<:mcheart:999898645417701376> Health: ${p2.hp}/100\n<:mcshield:999899147870142535> Defend: ${p2.def}/30`
                        m.update({
                            content: `${next}, your turn`,
                            embeds: [fightEmbed.setDescription(`\`${nowF.user.username} ${atks[Math.floor(Math.random() * atks.length)]}'d ${next.user.username} (costed ${atkAmount} hp)\``)],
                            components: [rowsON]
                        })
                        return second(ch, one, two)
                    } else if (chance[atkChance] === "no") {
                        p1.turn = false
                        await collector.stop()
                        fightEmbed.fields.find(f => f.name === `${userF.username}`).value = `<:mcheart:999898645417701376> Health: ${p2.hp}/100\n<:mcshield:999899147870142535> Defend: ${p2.def}/30`
                        m.update({
                            content: `${next}, your turn`,
                            embeds: [fightEmbed.setDescription(`\`${nowF.user.username} fail'd to attack ${next.user.username} (costed no hp)\``)],
                            components: [rowsON]
                        })
                        return second(ch, one, two)
                    }
                }
                if (m.customId ==="def") {
                    let defAmount = Math.floor(Math.random() * (settings.maxDef - settings.minDef) + settings.minDef)
                    p1.def += defAmount
                    if (p1.def > 30) {
                        return p1.def = 30
                    }
                    p1.turn = false
                    await collector.stop()
                    fightEmbed.fields.find(f => f.name === `${interaction.user.username}`).value = `<:mcheart:999898645417701376> Health: ${p1.hp}/100\n<:mcshield:999899147870142535> Defend: ${p1.def}/30`
                    m.update({
                        content: `${next}, your turn`,
                        embeds: [fightEmbed.setDescription(`\`${nowF.user.username} ${defs[Math.floor(Math.random() * defs.length)]} their defense by ${defAmount}\``)],
                        components: [rowsON]
                    })
                    return second(ch, one, two)
                }
                if (m.customId === "leave") {
                    let winner = two
                    let looser = one
                    await collector.stop()
                    m.update({ content: "_ _", embeds: [new MessageEmbed().setTitle("Updating end embed...").setColor("GOLD")], components: [rowsOFF] })
                    return end(ch, one, two, winner, looser, "leave")
                }
            })
        }

        async function second(ch, one, two) {
            let nowF = ch.guild.members.cache.get(two)
            let next = ch.guild.members.cache.get(one)

            let filter = m => m.user.id === nowF.id
            let collector = ch.createMessageComponentCollector(filter)

            if (p2.turn === true) return
            p2.turn = true

            if (p2.hp <= 0) {
                return end(ch, one, two, one, two, "defeat")
            }

            collector.on("collect", async (m) => {
                if (m.user.id !== p2.id && m.user.id !== p1.id) {
                    return m.reply({ ephemeral: true, content: "This fight isn't for you" })
                } else if (m.user.id !== p2.id && m.user.id === p1.id) {
                    return m.reply({ ephemeral: true, content: "Not your turn yet" })
                }

                if (m.customId === "atk") {
                    let atkAmount
                    if (p1.def >= 0 && p1.def < 6) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[0] - settings.minAtk[0]) + settings.minAtk[0])}
                    if (p1.def >= 6 && p1.def < 10) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[1] - settings.minAtk[1]) + settings.minAtk[1])}
                    if (p1.def >= 10 && p1.def < 15) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[2] - settings.minAtk[2]) + settings.minAtk[2])}
                    if (p1.def >= 15 && p1.def < 19) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[3] - settings.minAtk[3]) + settings.minAtk[3])}
                    if (p1.def >= 19 && p1.def < 26) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[4] - settings.minAtk[4]) + settings.minAtk[4])}
                    if (p1.def >= 26 && p1.def <= 30) {atkAmount = Math.floor(Math.random() * (settings.maxAtk[5] - settings.minAtk[5]) + settings.minAtk[5])}

                    let atkChance = Math.floor(Math.random() * chance.length)
                    if (chance[atkChance] === "yes") {
                        p1.hp -= atkAmount
                        p2.turn = false
                        await collector.stop()
                        fightEmbed.fields.find(f => f.name === `${interaction.user.username}`).value = `<:mcheart:999898645417701376> Health: ${p1.hp}/100\n<:mcshield:999899147870142535> Defend: ${p1.def}/30`
                        m.update({
                            content: `${next}, your turn`,
                            embeds: [fightEmbed.setDescription(`\`${nowF.user.username} ${atks[Math.floor(Math.random() * atks.length)]}'d ${next.user.username} (costed ${atkAmount} hp)\``)],
                            components: [rowsON]
                        })
                        return first(ch, one, two)
                    } else if (chance[atkChance] === "no") {
                        p2.turn = false
                        await collector.stop()
                        fightEmbed.fields.find(f => f.name === `${interaction.user.username}`).value = `<:mcheart:999898645417701376> Health: ${p1.hp}/100\n<:mcshield:999899147870142535> Defend: ${p1.def}/30`
                        m.update({
                            content: `${next}, your turn`,
                            embeds: [fightEmbed.setDescription(`\`${nowF.user.username} fail'd to attack ${next.user.username} (costed no hp)\``)],
                            components: [rowsON]
                        })
                        return first(ch, one, two)
                    }
                }
                if (m.customId ==="def") {
                    let defAmount = Math.floor(Math.random() * (settings.maxDef - settings.minDef) + settings.minDef)
                    p2.def += defAmount
                    if (p2.def > 30) {
                        return p2.def = 30
                    }
                    p2.turn = false
                    await collector.stop()
                    fightEmbed.fields.find(f => f.name === `${userF.username}`).value = `<:mcheart:999898645417701376> Health: ${p2.hp}/100\n<:mcshield:999899147870142535> Defend: ${p2.def}/30`
                    m.update({
                        content: `${next}, your turn`,
                        embeds: [fightEmbed.setDescription(`\`${nowF.user.username} ${defs[Math.floor(Math.random() * defs.length)]} their defense by ${defAmount}\``)],
                        components: [rowsON]
                    })
                    return first(ch, one, two)
                }
                if (m.customId === "leave") {
                    let winner = one
                    let looser = two
                    await collector.stop()
                    m.update({ content: "_ _", embeds: [new MessageEmbed().setTitle("Updating end embed...").setColor("GOLD")], components: [rowsOFF] })
                    return end(ch, one, two, winner, looser, "leave")
                }
            })
        }

        async function end(ch, one, two, winner, looser, reason) {
            let wonData
            let won = ch.guild.members.cache.get(winner)
            let lose = ch.guild.members.cache.get(looser)

            if (winner === one) wonData = p1
            if (winner === two) wonData = p2

            const endEmbed = new MessageEmbed()
            if (reason === "defeat") {
                endEmbed.setTitle("Congratz").setDescription(`${won.user.username} has defeated ${lose.user.username}`).setColor("#00ad1d")
            } else if (reason === "leave") {
                endEmbed.setTitle("Leaved").setDescription(`${lose.user.username} leaved the fight`).setColor("#00ad1d")
            //} else if (reason === "timeout") {
            //    endEmbed.setTitle("Timeout").setDescription(`${lose.user.username} didn't react in time`).setColor("#00ad1d")
            } else {
                endEmbed.setTitle("Idk anymore").setDescription("My owner made a typo or smth").setColor("#00ad1d")
            }

            setTimeout(function() {
                return botMsg.edit({ content: `GG ${won}`, embeds: [endEmbed], components: [rowsOFF] })
            }, 600)
        }
    }
}

module.exports = {
    name: "fight",
    description: "Fight someone minigame",
    options: [{
        name: "user",
        description: "The user you want to fight",
        type: "USER",
        required: true,
    }],
    run: run
}