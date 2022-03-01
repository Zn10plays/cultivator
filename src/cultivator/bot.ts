import { Bot, createBot } from "mineflayer";
import { account, server } from "../../bot.config.json";
import { pathfinder } from 'mineflayer-pathfinder'

class Cultivator {
  bot: Bot
  
  init() {
    this.bot = createBot({
      username: account.username,
      password: account.password,
      auth: account.mojang ? "mojang" : "microsoft",
      host: server.host,
      port: server.port
    })

    this.bot.loadPlugin(pathfinder)
  }

  stop() {
    this.bot.quit()
  }

  
}

export default Cultivator