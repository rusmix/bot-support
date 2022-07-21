require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const BotStrategies = require("./botStrategies");

class BotConfig {
  constructor() {
    this.telegramBot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: true,
    });

    this.strategies = new BotStrategies(this.telegramBot);
  }

  initializeStrategies() {
    this.telegramBot.on(
      "message",
      async (msg) => await this.strategies.onMessage(msg)
    );
  }
}

module.exports = BotConfig;
