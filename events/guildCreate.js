module.exports = {
    name: "guildCreate",
    run: async (guild) => {
        guild.commands.set([...client.slashcommands.values()])
    }
}