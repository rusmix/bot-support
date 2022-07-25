const fs = require('fs');

class BotStrategies {
  constructor(telegramBot, services) {
    const groupId = JSON.parse(fs.readFileSync(__dirname + '/group.json')).groupId
    this.groupId = groupId;
    this.telegramBot = telegramBot;
    this.userService = services.userService;
    this.groupService = services.groupService;
  }

  async #handleMessageFromUser(msg) {
    try {
      const userSupportGroupId = (await this.userService.findById(msg.from.id)).groupId;
      console.log("puk: ",+userSupportGroupId);
      const sentMessage = await this.telegramBot.forwardMessage(
        +userSupportGroupId,
        // msg.chat.id,
        508119341,
        msg.message_id
    )
      if (!sentMessage)
        return await this.telegramBot.sendMessage(
          msg.chat.id,
          "Возникла непредвиденная ошибка"
        );
    } catch (e) {
      return this.telegramBot.sendMessage(msg.chat.id, e.message)
    }
  }

  async #handleMessageFromSupport(msg){
    if (!msg.reply_to_message) return;
    if (!msg.reply_to_message.from.is_bot) return;
    const userId = msg.reply_to_message.forward_from.id;
    if (!userId) return;
    try{
        // const sentReply = await this.telegramBot.sendMessage(userId, msg.text);
        const sentReply = await this.telegramBot.forwardMessage(
          userId,
          msg.chat.id,
          msg.message_id
      )
        if (!sentReply)
            return await this.telegramBot.sendMessage(
            this.groupId,
            "Ответ не отправлен, возникла ошибка на стороне telegram :("
        );
        // return await this.telegramBot.sendMessage(this.groupId, "Ответ отправлен!");
    }
    catch (e) {
      return await this.telegramBot.sendMessage(
        this.groupId,
        `Текст ошибки: ${e.message}`)
    }
  }

  async #setThisGroupAsSupport(msg) {
    console.log(msg.chat.id);
    if (msg.text.split(' ')[1] === process.env.BOT_SECRET) {
      // fs.writeFileSync(__dirname + '/group.json', JSON.stringify({ groupId: msg.chat.id }));
      // this.groupId = msg.chat.id;
      await this.groupService.create(msg.chat.id);
      return this.telegramBot.sendMessage(msg.chat.id, 'Эта группа успешно установлена как группа поддержки');
    }
    return this.telegramBot.sendMessage(msg.chat.id, 'Неверная секретная фраза, используйте команду /set_this_group_as_support <secret_phrase>')
  }

  async onMessage(msg) {
    console.log(msg.from);
    // if (!msg.text) return;
    if (msg.text?.startsWith("/start")) return this.onStart(msg);
    if (msg.text?.split(' ')[0] === '/set_this_group_as_support')
      return this.#setThisGroupAsSupport(msg);
    if (msg.chat.id !== this.groupId)
      return this.#handleMessageFromUser(msg);

    return this.#handleMessageFromSupport(msg);
  }

  async onStart(msg) {
    const group = await this.groupService.findGroupWithMinimumUsers();
    const user = await this.userService.create(msg.from, group.id);
  }
}

module.exports = BotStrategies;