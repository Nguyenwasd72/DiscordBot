module.exports = {
	name: "interactionCreate",
	run: async (Bot, interaction) => {
		if (interaction.isCommand()) handleSlashCommand(Bot, interaction)
	},
}

const handleSlashCommand = (Bot, interaction) => {
	const {client} = Bot
	if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

	const slashcmd = client.slashcommands.get(interaction.commandName)

	if (!slashcmd) return

	if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms))
		return interaction.reply("You don't have permission to use this command")

	slashcmd.run(client, interaction)
}
