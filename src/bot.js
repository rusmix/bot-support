require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const userSide = require('../strategies/onMessage');
const groupId = process.env.GROUP_ID;


class BotConfig {
    constructor() {
        this.telegramBot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
        };

    // initializeStrategies() {
    //     this.telegramBot.onText(/\/start/, async (msg) => await onStart(msg, this.telegramBot));

    //     this.telegramBot.on("message", async (msg) => await onMessage(msg, this.telegramBot));
    // }

    initializeStrategies() {
        this.telegramBot.on("message", async (msg) => await onMessage(msg, this.telegramBot));
        console.log(123);
    }
}

module.exports = BotConfig;