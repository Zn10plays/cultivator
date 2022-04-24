import { createBot, Bot } from 'mineflayer';
import { pathfinder } from 'mineflayer-pathfinder';
import loadAllStates from './manager';

class Cultivator {
  bot: Bot;

  public init() {
    const bot = createBot({
      username: process.env.MCUSERNAME,
      password: process.env.MCPASSWORD,
      auth: 'microsoft',
      host: 'localhost',
      version: '1.18.2'
    })
    
    bot.loadPlugins([pathfinder]);

    loadAllStates(bot);
  }

  public terminate() {
    this.bot.quit();
  }
}

export default Cultivator;