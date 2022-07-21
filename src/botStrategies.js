const groupId = process.env.GROUP_ID;

class BotStrategies {
    constructor(telegramBot) {
        this.telegramBot = telegramBot;
    }

    onMessage = (msg) => {
        userSide(msg, this.telegramBot);
        groupSide(msg, this.telegramBot)
    }
}

module.exports = BotStrategies;