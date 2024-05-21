const run = async(client, interaction) => {
    let botId = '888630502691594290';
    let creatorId = '884019263160062002';
    let mentionedMember = interaction.options.getMember("target");

    if (mentionedMember.id === botId) {
    let tries = "You cant kill me"

    let response = tries;

    return interaction.reply(response);
    }

    if (mentionedMember.id === creatorId) {
        let triesToKillCreator = [
            "You cant kill my creator",
        ];
    
        let responseTryingToKillCreator = triesToKillCreator[Math.floor(Math.random() * triesToKillCreator.length)];
    
        return interaction.reply(responseTryingToKillCreator);
        }

    let kills = ['You'];
    let weapon = ['a book', 'a scissors', 'a spoon', 'a gun', 'a baseball bat', 'a coconut', 'a ball', "a bo'oh o' wo'oh", 'a keyboard'];
    let responseKills = kills[Math.floor(Math.random() * kills.length)];
    let responseWeapon = weapon[Math.floor(Math.random() * weapon.length)];

    return interaction.reply(`${responseKills} killed ${mentionedMember} with ${responseWeapon}`);
}

module.exports = {
    name: "kill",
    description: "Kill someone (murder is illegal dont try this irl)",
    options: [{
        name: "target",
        description: "The person you want to kill (in Discord)",
        type: "USER",
        required: true,
    }],
    run: run
}