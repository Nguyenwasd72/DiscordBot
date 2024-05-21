const fetch = require("node-fetch")

const run = async (client, interaction) => {
    const getImageURL = async () => {
        try {
            const resp = await fetch("https://api.giphy.com/v1/gifs/random?api_key=0UTRbFtkMxAplrohufYco5IY74U8hOes&tag=minecraft&rating=pg-13&username=minecraft", {
                method: "GET",
                headers: { Accept: "application/json" },
            });
            const json = await resp.json()
            const url = json.data.url

            return url
        } catch (error) {
            interaction.reply(error)
        }
        };
        const url = await getImageURL()
        interaction.channel.send(url)
    }

module.exports = {
    name: 'randomgif',
    description: "Some random Minecraft gif",
    run: run
}