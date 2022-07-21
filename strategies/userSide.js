const TelegramBot = require('node-telegram-bot-api');

const groupId = process.env.GROUP_ID;

const userSide = (msg, telegramBot) => {
    userId = msg.chat.id;
    if(userId != groupId) {
        const sentMessage = await telegramBot.sendMessage(groupId, msg.text);
        if (sentMessage)
            telegramBot.sendMessage(msg.chat.id, "message was sent to people, pls wait...");
        else
            telegramBot.sendMessage(msg.chat.id, "some error accured, try again");
    }
    groupSide(msg, telegramBot, userId);

}

module.exports = userSide;