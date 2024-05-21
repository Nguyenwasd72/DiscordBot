const { getFiles } = require("../util/functions")

module.exports = (Bot, reload) => {
    const {client} = Bot

    let events = getFiles("./events/", ".js")

    if (events.length === 0){
        console.log("No events to load")
    }

    events.forEach((f, i) => {
        if (reload) 
            delete require.cache[require.resolve(`../events/${f}`)]
        const event = require(`../events/${f}`)
        client.events.set(event.name, event)

        if (!reload)
            console.log(`${i + 1}. ${f} loaded`)
    })

    if (!reload)
        initEvents(Bot)
}

function triggerEventHandler(Bot, event, ...args){
    const {client} = Bot 

    try {
        if (client.events.has(event))
            client.events.get(event).run(Bot, ...args)
        else 
            throw new Error(`Event ${event} does not exist`)
    }
    catch(err){
        console.error(err)
    }
}

function initEvents(Bot) {
    const {client} = Bot 

    client.on("ready", () => {
        triggerEventHandler(Bot, "ready")
    })

    client.on("messageCreate", (message) => {
        triggerEventHandler(Bot, "messageCreate", message)
    })

    client.on("interactionCreate", (interaction) => {
        triggerEventHandler(Bot, "interactionCreate", interaction)
    })

    client.on("guildCreate", (guild) => {
        triggerEventHandler(Bot, "guildCreate", guild)
    })
}