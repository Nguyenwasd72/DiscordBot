const { MessageActionRow , MessageButton } = require("discord.js")

const run = async (client, interaction) => {
	interaction.reply("Started the football game")

	const positions = {
		left: '🥅🥅🥅\n🕴️\n      \n       ⚽',
		middle: '🥅🥅🥅\n       🕴️\n      \n       ⚽',
		right: '🥅🥅🥅\n             🕴️\n      \n       ⚽',
	};
	let randomized = Math.floor(Math.random() * Object.keys(positions).length);
	let gameEnded = false;
	let randomPos = positions[Object.keys(positions)[randomized]];

	const componentsArray = [
		{
			type: 1,
			components: [
				{
					type: 2,
					style: 'SECONDARY',
					custom_id: 'left',
					label: 'Left',
				},
				{
					type: 2,
					style: 'SECONDARY',
					custom_id: 'middle',
					label: 'Middle',
				},
				{
					type: 2,
					style: 'SECONDARY',
					custom_id: 'right',
					label: 'Right',
				},
			],
		},
	];

	const componentsArrayEnded = new MessageActionRow().addComponents(
		new MessageButton()
			.setCustomId('left')
			.setLabel('Left')
			.setStyle('SECONDARY')
			.setDisabled(true),
		new MessageButton()
			.setCustomId('middle')
			.setLabel('Middle')
			.setStyle('SECONDARY')
			.setDisabled(true),
		new MessageButton()
			.setCustomId('right')
			.setLabel('Right')
			.setStyle('SECONDARY')
			.setDisabled(true)
	)

	const msg = await interaction.channel.send({
		content: randomPos,
		components: componentsArray,
	});
	function update() {
		randomized = Math.floor(Math.random() * Object.keys(positions).length);
		randomPos = positions[Object.keys(positions)[randomized]];

		msg.edit({
			content: randomPos,
			components: componentsArray,
		});
	}
	setInterval(() => {
		if(gameEnded == false) return update();
	}, 1700);

	const filter = button => {
		return button.user.id === interaction.user.id;
	};
	const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

	if(button.customId !== Object.keys(positions)[randomized]) {
		gameEnded = true;
		msg.edit({ content: randomPos, components: [componentsArrayEnded] })
		return button.reply({ content: 'You won' })
	}
	else {
		gameEnded = true;
		msg.edit({ content: randomPos, components: [componentsArrayEnded] })
		return button.reply({ content: 'You lost' });
	}
}

module.exports = {
	name: 'football',
	description: 'Play a football minigame',
	run: run
};