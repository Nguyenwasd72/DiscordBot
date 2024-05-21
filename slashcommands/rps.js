const run = async(client, interaction) => {
    const acceptedReplies = ['rock', 'paper', 'scissors'];
    const random = Math.floor((Math.random() * acceptedReplies.length));
    const result = acceptedReplies[random];
  
    const choice = interaction.options.getString("choose")
    if (!acceptedReplies.includes(choice)) return interaction.reply(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);

    if (result === choice) return interaction.reply("My result: " + result + '\nYour result: ' + choice + "\nIt's a tie :necktie:");
          
    switch (choice) {
        case 'rock': {
            if (result === 'paper') return interaction.reply('My Result: ' + result + '\nYour Result: ' + choice + '\n\nI won :thumbsup:');
            else return interaction.reply('My result: ' + result + '\nYour result: ' + choice + '\n\nYou won :flag_white:');
        }
        case 'paper': {
            if (result === 'scissors') return interaction.reply('My Result: ' + result + '\nYour Result: ' + choice + '\n\nI won :thumbsup:');
            else return interaction.reply('My result: ' + result + '\nYour result: ' + choice + '\n\nYou won :flag_white:');
        }
        case 'scissors': {
            if (result === 'rock') return interaction.reply('My Result: ' + result + '\nYour Result: ' + choice + '\n\nI won :thumbsup:');
            else return interaction.reply('My result: ' + result + '\nYour result: ' + choice + '\n\nYou won :flag_white:');
        }
        default: {
            return interaction.reply(`Only these responses are only accepted: \`${acceptedReplies.join(', ')}\``);
        }
    }
}

module.exports = {
    name: "rps",
    description: "Play Rock Paper Scissors with me",
    options: [{
        name: "choose",
        description: "Choose Rock, Paper or Scissors",
        type: "STRING",
        choices: [{
                name: "Rock",
                value: "rock"
            },
            {
                name: "Paper",
                value: "paper"
            },
            {
                name: "Scissors",
                value: "scissors"
            }],
        required: true,
    }],
    run: run
}