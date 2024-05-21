const fetch = require("node-fetch")

const run = async (client, interaction) => {
    const getJoke = async () => {
        try {
            const resp = await fetch("https://icanhazdadjoke.com", {
                method: "GET",
                headers: { Accept: "application/json" },
            });
            const json = await resp.json()
            const joke = json.joke
  
            return joke;
        } catch (error) {
            interaction.reply(error)
        }
        };
        const joke = await getJoke()
        interaction.reply(joke)
    }

module.exports = {
    name: 'dadjoke',
    description: "Gives you a random Dad Joke™",
    run: run
}