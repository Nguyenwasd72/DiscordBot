module.exports = {
    name: "messageCreate",
    run: async function runAll(Bot, message) {
        const {client, prefix, owners} = Bot

        if (!message.guild) return message.reply("This command can only be used in a server") 

        if (message.author.bot) return 

        if (!message.content.startsWith(prefix))
            return 

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr)
        if (!command) return 

        let member = message.member 

        if (command.devOnly && !owners.includes(member.id)){
            return message.reply("This command is only available to my creator")
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0  && !owners.includes(member.id)){
            return message.reply("You don't have permission to use this command")
        }
        
        try {
            await command.run({...Bot, message, args})
        }
        catch (err) {
            let errMsg = err.toString()

            if (errMsg.startsWith("?")) {
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            }
            else 
                console.error(err)
        }
    } 
}
