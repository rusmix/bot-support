const groupId = +process.env.GROUP_ID;

class BotStrategies {
  constructor(telegramBot) {
    this.telegramBot = telegramBot;
  }

  async onMessage(msg) {
    console.log(msg.chat.id);
    if (!msg.text) return;
    if (msg.text.startsWith("/start")) return;

    if (msg.chat.id !== groupId) return this.#handleMessageFromUser(msg);

    return this.#handleMessageFromSupport(msg);
  }

  async #handleMessageFromUser(msg) {
    const sentMessage = await this.telegramBot.sendMessage(
      groupId,
      `Message from: ${msg.chat.id}.\n\n${msg.text}`
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

  async #handleMessageFromSupport(msg) {
    if (!msg.text) return;
    if (!msg.text.startsWith("/reply")) return;
    try {
      const [chatId, text] = [
        +msg.text.split(" ")[1],
        msg.text.split(" ").slice(2).join(" "),
      ];
      const sentReply = await this.telegramBot.sendMessage(chatId, text);
      if (!sentReply)
        return await this.telegramBot.sendMessage(
          groupId,
          "Ответ не отправлен, возникла ошибка на стороне telegram :("
        );
      return await this.telegramBot.sendMessage(groupId, "Ответ отправлен!");
    } catch (e) {
      return await this.telegramBot.sendMessage(
        groupId,
        `Не верно введена команда '/reply <chatId> <text>', текст ошибки: ${e.message}`
      );
    }
  }
}

module.exports = BotStrategies;
