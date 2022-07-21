const TelegramBot = require('node-telegram-bot-api');
const userSide = require('./onMessage');
const groupId = process.env.GROUP_ID;


const onMessage = (msg, telegramBot) => {
    userSide(msg, telegramBot);
    groupSide(msg, telegramBot)
}

module.exports = onMessage;