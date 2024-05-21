module.exports = {
    name: "ready",
    run: async (Bot) => {
        console.log(`|Logged in as ${Bot.client.user.tag}   |
------------------------------`)
        Bot.client.user.setActivity('Minecraft', { type: 'PLAYING' })

        // const activity = [
        //     "Minecraft",
        //     "mInecraft",
        //     "miNecraft",
        //     "minEcraft",
        //     "mineCraft",
        //     "minecRaft",
        //     "minecrAft",
        //     "minecraFt",
        //     "minecrafT"
        // ]

        // let index = 0

        // setInterval(() => {
        //     if (index === activity.length) index = 0
        //     const status = activity[index]
        //     index++
        // }, 3800)
    }
}
