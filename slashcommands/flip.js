const { MessageEmbed } = require("discord.js")

const run = async(client, interaction) => {
    const coin = ['Head', 'Tail']
    const random = Math.floor((Math.random() * coin.length));
    const result = coin[random]

    const tailEmbed = new MessageEmbed()

    .setThumbnail('https://en.numista.com/catalogue/photos/viet_nam/602-original.jpg')
    .setTitle("Result:")
    .setDescription('Tail')
    .setColor('#696969')

    //----------------------------------

    const headEmbed = new MessageEmbed()

    .setThumbnail('https://en.numista.com/catalogue/photos/viet_nam/603-original.jpg')
    .setTitle("Result:")
    .setDescription('Head')
    .setColor('#696969')

    //----------------------------------

    const flippingEmbed = new MessageEmbed()

    .setThumbnail('https://freight.cargo.site/t/original/i/8c26cb1e6d8b7aead75057ad75428318b5e604d054e018e62d7b3a628c6bb70b/coinflip_01.gif')
    .setTitle('Flipping...')
    .setDescription('Flipping the coin...')
    .setColor('#696969')

    setTimeout(function(){ 
        if (result === 'Head')
            interaction.editReply({embeds: [headEmbed]})
        if (result === 'Tail')
            interaction.editReply({embeds: [tailEmbed]})
    }, 1500)

    interaction.reply({embeds: [flippingEmbed]})
    setTimeout
}

module.exports = {
    name: 'flip',
    description: "Flip a coin",
    run: run
}