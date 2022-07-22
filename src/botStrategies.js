const groupId = +process.env.GROUP_ID;

class BotStrategies {
  constructor(telegramBot) {
    this.telegramBot = telegramBot;
  }

  async onMessage(msg) {
    if (!msg.text) return;
    if (msg.text.startsWith("/start")) return;
    if (msg.chat.id !== groupId) return this.#handleMessageFromUser(msg);

    return this.#handleMessageFromSupport(msg);
  }

  async #handleMessageFromUser(msg) {
    const sentMessage = await this.telegramBot.sendMessage(
        groupId,
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
            groupId,
            "Ответ не отправлен, возникла ошибка на стороне telegram :("
        );
        return await this.telegramBot.sendMessage(groupId, "Ответ отправлен!");
    }
    catch (e) {
      return await this.telegramBot.sendMessage(
        groupId,
        `текст ошибки: ${e.message}`)
    }
  }
}

module.exports = BotStrategies;
