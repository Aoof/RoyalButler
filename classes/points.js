const twitch = require("./twitchapi.js")
const db = require("../db.js")
const logger = require("./logger.js")

module.exports = {
    add_points(user, points) {
        db.update(['userid', user.user.userid], ["points"], 
        [user.userdata.points + points], 'userdata')
        .then(res => {
            logger.log(res)
        })
        .catch(err => {
            logger.log(err)
        })
    },
    timedMessage(interval) {
        logger.log(`There are ${this.online_users.length} users online`)
        this.client.say('#'+this.env.channel, 'Don\'t mind me, just wanted to say the king\'s head looks extra shiny today')
        setTimeout(() => this.timedMessage(interval), 1000*60*interval)
    },
    timedMessage2(interval) {
        logger.log(`There are ${this.online_users.length} users online`)
        this.client.say('#'+this.env.channel, 'If you see a bug, get my master Aoof to squash it')
        setTimeout(() => this.timedMessage2(interval), 1000*60*interval)
    },
    onlineUsersHandler() {
        if (!this.online_users) return;
        this.online_users.forEach(online_user => {
            let multiplier = 1
            if (online_user.user.subscriber) multiplier += .2
            this.add_points(online_user, 10*multiplier)
        })

        setTimeout(this.onlineUsersHandler, 1000*10)
    }
}