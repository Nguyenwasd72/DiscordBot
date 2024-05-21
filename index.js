const Discord = require("discord.js")
const fs = require("fs")

const TOKEN = require("./secrets.json").discord

const LOAD_SLASH = process.argv[2] == "loader"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGE_REACTIONS"
    ]
})

let Bot = {
    client,
    prefix: "kn!",
    owners: "884019263160062002",
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()

let slashcommands = fs.readdirSync("./slashcommands/").filter((f) => f.endsWith(".js"))

slashcommands.forEach((f, i) => {
    const slashcmd = require(`./slashcommands/${f}`)
    client.slashcommands.set(slashcmd.name, slashcmd)
})

if (LOAD_SLASH) {
    client.on("ready", async () => {
        console.log(`Loading ${client.slashcommands.size} slash commands to ${client.guilds.cache.size} servers...`)
        const guilds = client.guilds.cache.map(g => g.id)
        for (var i = 0; i < guilds.length; ++i) {
            const guild = client.guilds.cache.get(guilds[i])
            try {
                await guild.commands.set([...client.slashcommands.values()])
                console.log(`Successfully loaded slash commands to ${guild.name}`)
            } catch (slashErr) {
                console.log(`Failed to load slash commands to ${guild.name}\nReason: ${slashErr}`)
            }
        }
        console.log(`Successfully loaded ${client.slashcommands.size} slash commands to ${client.guilds.cache.size} servers`)
        process.exit(0)
    })
} else {
    client.loadEvents = (Bot, reload) => require("./handlers/events")(Bot, reload)
    client.loadCommands = (Bot, reload) => require("./handlers/commands")(Bot, reload)
    client.loadSlashCommands = (Bot, reload) => require("./handlers/slashcommands")(Bot, reload)

    client.loadEvents(Bot, false)
    client.loadCommands(Bot, false)
    client.loadSlashCommands(Bot, false)
}

module.exports = {
    Bot
}

client.login(TOKEN)
