const fs = require("fs")

const getFiles = (path, ending) => {
	return fs.readdirSync(path).filter((f) => f.endsWith(ending))
}

module.exports = (Bot, reload) => {
	const { client } = Bot

	let slashcommands = getFiles("./slashcommands/", ".js")

	if (slashcommands.legnth === 0) {
		console.log("No slash commands loaded")
	}

	slashcommands.forEach((f, i) => {
		if (reload) delete require.cache[require.resolve(`../slashcommands/${f}`)]
		const slashcmd = require(`../slashcommands/${f}`)
		client.slashcommands.set(slashcmd.name, slashcmd)
	})

	console.log(`|Loading ${client.slashcommands.size} slash commands...|`)
}