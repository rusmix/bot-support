require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const BotStrategies = require("./botStrategies");
const { UserService, GroupService } = require('./services');
const { UsersRepository, GroupsRepository, prisma } = require('./repositories');

class BotConfig {
  constructor() {
    this.telegramBot = new TelegramBot(process.env.BOT_TOKEN, {
      polling: true,
    });

    this.strategies = new BotStrategies(this.telegramBot, {
      userService: new UserService(new UsersRepository(prisma)),
      groupService: new GroupService(new GroupsRepository(prisma))
    });
  }

  initializeStrategies() {
    this.telegramBot.on(
      "message",
      async (msg) => await this.strategies.onMessage(msg)
    );
  }
}

module.exports = BotConfig;
