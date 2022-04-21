import { createBot, Bot } from 'mineflayer';
import { pathfinder } from 'mineflayer-pathfinder';

class Cultivator {
  bot: Bot;

  public init() {
    const bot = createBot({
      username: process.env.MCUSERNAME,
      password: process.env.MCPASSWORD,
      host: 'localhost',
    })
    
    bot.loadPlugins([pathfinder]);
  }

  public terminate() {
    this.bot.quit();
  }
}

export default Cultivator;