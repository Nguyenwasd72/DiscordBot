const run = async (client, interaction) =>{
    if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply("I can't nuke this channel because i don't have MANAGE_CHANNELS permissions")

    interaction.channel.clone().then((ch) => {
        ch.setParent(interaction.channel.parent.id)
        ch.setPosition(interaction.channel.position)
        interaction.channel.delete()
        
        ch.send(`Channel nuked by **${interaction.user.username}** ☢`)
    });
}

module.exports = {
    name: "nuke",
    description: "Nuke the channel you're at",
    perms: "MANAGE_CHANNELS",
    run: run
}