const { MessageAttachment } = require("discord.js")
const DIG = require("discord-image-generation")

const run = async (client, interaction) => {
    const reply = async (attach) => {
        try {
            await interaction.deferReply()
            await interaction.editReply({ files: [attach] })
        } catch (e) {}
    }
    const option = interaction.options.getString("type")
    if (option == "affect") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.Affect().getImage(avatar)

        const attach = new MessageAttachment(img, "affect.png")
        reply(attach)
    } else if (option == "changemymind") {
        const text = interaction.options.getString("text")
        if (!text) return interaction.reply("Provide a text")
        if (text.length > 150) return interaction.reply("Provide a text of 150 characters or less")

        const img = await new DIG.ChangeMyMind().getImage(text)

        const attach = new MessageAttachment(img, "changemymind.png")
        reply(attach)
    } else if (option == "confusedstonks") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.ConfusedStonk().getImage(avatar)

        const attach = new MessageAttachment(img, "confusedstonks.png")
        reply(attach)
    } else if (option == "deepfry") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.Deepfry().getImage(avatar)

        const attach = new MessageAttachment(img, "deepfry.png")
        reply(attach)
    } else if (option == "delete") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.Delete().getImage(avatar)

        const attach = new MessageAttachment(img, "delete.png")
        reply(attach)
    } else if (option == "notstonks") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.NotStonk().getImage(avatar)

        const attach = new MessageAttachment(img, "notstonks.png")
        reply(attach)
    } else if (option == "presentation") {
        const text = interaction.options.getString("text")
        if (!text) return interaction.reply("Provide a text")
        if (text.length > 300) return interaction.reply("Provide a text of 300 characters or less")

        const img = await new DIG.LisaPresentation().getImage(text)

        const attach = new MessageAttachment(img, "presentation.png")
        reply(attach)
    } else if (option == "slap") {
        const user = interaction.options.getUser("user")
        if (!user) return interaction.reply("Choose an user to slap")

        const avatar1 = interaction.user.displayAvatarURL({ dynamic: false, format: 'png' })
        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.Batslap().getImage(avatar1, avatar2)

        const attach = new MessageAttachment(img, "slap.png")
        reply(attach)
    } else if (option == "spank") {
        const user = interaction.options.getUser("user")
        if (!user) return interaction.reply("Choose an user to spank")

        const avatar1 = interaction.user.displayAvatarURL({ dynamic: false, format: 'png' })
        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
    
        const img = await new DIG.Spank().getImage(avatar1, avatar2)

        const attach = new MessageAttachment(img, "spank.png")
        reply(attach)
    } else if (option == "stonks") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.Stonk().getImage(avatar)

        const attach = new MessageAttachment(img, "stonks.png")
        reply(attach)
    } else if (option == "trash") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.Trash().getImage(avatar)

        const attach = new MessageAttachment(img, "trash.png")
        reply(attach)
    } else if (option == "trigger") {
        const user = interaction.options.getUser("user") || interaction.user

        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

        const img = await new DIG.Triggered().getImage(avatar)

        const attach = new MessageAttachment(img, "trigger.gif")
        reply(attach)
    }
}

module.exports = {
    name: "image",
    description: "Generate images",
    options: [
        {
            name: "type",
            description: "Choose a type",
            type: "STRING",
            choices: [
                {
                    name: "bed",
                    value: "bed"
                },
                {
                    name: "change my mind",
                    value: "changemymind"
                },
                {
                    name: "confused stonks",
                    value: "confusedstonks"
                },
                {
                    name: "deep fry",
                    value: "deepfry"
                },
                {
                    name: "delete",
                    value: "delete"
                },
                {
                    name: "not stonks",
                    value: "notstonks"
                },
                {
                    name: "presentation",
                    value: "presentation"
                },
                {
                    name: "slap",
                    value: "slap"
                },
                {
                    name: "spank",
                    value: "spank"
                },
                {
                    name: "stonks",
                    value: "stonks"
                },
                {
                    name: "trash",
                    value: "trash"
                },
                {
                    name: "trigger",
                    value: "trigger"
                }
            ],
            required: true
        },
        {
            name: "user",
            description: "Choose an user",
            type: "USER",
            required: false
        },
        {
            name: "text",
            description: "Type text",
            type: "STRING",
            required: false
        }
    ],
    run: run
}