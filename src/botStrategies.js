const fs = require('fs');

class BotStrategies {
  constructor(telegramBot) {
    const groupId = JSON.parse(fs.readFileSync(__dirname + '/group.json')).groupId
    this.groupId = groupId;
    this.telegramBot = telegramBot;
  }

  async onMessage(msg) {
    if (!msg.text) return;
    if (msg.text.startsWith("/start")) return;
    if (msg.text.split(' ')[0] === '/set_this_group_as_support') 
      return this.#setThisGroupAsSupport(msg);
    if (msg.chat.id !== this.groupId) return this.#handleMessageFromUser(msg);

    return this.#handleMessageFromSupport(msg);
  }

  async #handleMessageFromUser(msg) {
    try {
      const sentMessage = await this.telegramBot.sendMessage(
          this.groupId,
          `${msg.chat.id}\nОт:${msg.from.username}\n${msg.text}`
      );

      if (!sentMessage)
        return await this.telegramBot.sendMessage(
          msg.chat.id,
          "Возникла непредвиденная ошибка"
        );
      return await this.telegramBot.sendMessage(
        msg.chat.id,
        "Ваше сообщение успешно передано в поддержку"
      );
    } catch (e) {
      return this.telegramBot.sendMessage(msg.chat.id, 'Группа поддержки не установлена, используйте команду /set_this_group_as_support <secret_phrase>')
    }
  }

  async #handleMessageFromSupport(msg){
    if (!msg.text) return;
    if (!msg.reply_to_message) return;
    if (!msg.reply_to_message.from.is_bot) return;
    const userId = msg.reply_to_message.text.split("\n")[0];
    if (!userId) return;
    try{
        const sentReply = await this.telegramBot.sendMessage(userId, msg.text);
        if (!sentReply)
            return await this.telegramBot.sendMessage(
            this.groupId,
            "Ответ не отправлен, возникла ошибка на стороне telegram :("
        );
        return await this.telegramBot.sendMessage(this.groupId, "Ответ отправлен!");
    }
    catch (e) {
      return await this.telegramBot.sendMessage(
        this.groupId,
        `текст ошибки: ${e.message}`)
    }
  }

  async #setThisGroupAsSupport(msg) {
    if (msg.text.split(' ')[1] === process.env.BOT_SECRET) {
      fs.writeFileSync(__dirname + '/group.json', JSON.stringify({ groupId: msg.chat.id }));
      this.groupId = msg.chat.id;
      return this.telegramBot.sendMessage(msg.chat.id, 'Эта группа успешно установлена как группа поддержки');
    }
    return this.telegramBot.sendMessage(msg.chat.id, 'Неверная секретная фраза, используйте команду /set_this_group_as_support <secret_phrase>')
  }
}

module.exports = BotStrategies;
