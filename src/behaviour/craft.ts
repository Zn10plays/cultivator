import { once } from 'events'
import Template from './template';
import mcData, { Item } from 'minecraft-data';
import { goals } from 'mineflayer-pathfinder';

class Craft extends Template {
  data;
  constructor(bot, state) {
    super('Craft', state, bot);
    this.data = mcData(bot.version); 
  }

  public execute(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  private findCraftable(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const block = super.bot.findBlock({
        matching: this.data.blocksByName['crafting_table'].id,
        maxDistance: 20,
      })

      if (block) {
        resolve(true);
      } else {
        reject(false);
      }
    })
  }

  private goToCraftingTable(block): Promise<boolean> { 
    return new Promise((resolve, reject) => {
      try {
        super.bot.pathfinder.setGoal(new goals.GoalNear(block.position.x, block.position.y, block.position.z, 3));
        once(super.bot, 'goal_reached')
        .then(() => {
          resolve(true);
        })
      } catch (error) {
        reject(error);
      }
    })
  }

  private craft(name, count, bench): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const item: Item = this.data.itemsByName[name];
      const recipe = super.bot.recipesFor(item.id, null, count, true);
      if (recipe.length) {
        super.bot.craft(recipe[0], count, bench)
        .then(() => {
          resolve(true);
        })
      } else {
        reject('Can\'t craft it without items');
      }
    })
  }

  public abort() {
    return new Promise((resolve, reject) => {
        
    })
  }
}