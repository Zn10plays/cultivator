import Template from './template';
import { Block } from 'prismarine-block';
import { Vec3 } from 'vec3';
import { goals } from 'mineflayer-pathfinder';
import { once } from 'events';

class CollectFromChests extends Template {
  constructor(bot, state) {
    super('Collect From Chests', state, bot);
  }

  public execute(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.fineAllChests()
      .then(() => {
        if (super.state.targetBlock.length === 0) {
          super.bot.chat('No chests found');
          resolve(false);
          return;
        } else {
          super.bot.chat(`Found ${super.state.targetBlock.length} chests`);
        }
      })
      .then(() => {

      })
      resolve(true);
    });
  }

  private fineAllChests(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      for (let i = super.bot.entity.position.x - 20; i < super.bot.entity.position.x + 20; i++) {
        for (let j = super.bot.entity.position.y - 20; j < super.bot.entity.position.y + 20; j++) {
          for (let k = super.bot.entity.position.z - 20; k < super.bot.entity.position.z + 20; k++) {
            const block = super.bot.blockAt(new Vec3(i, j, k));
            if (block && block.name === 'chest') {
              super.state.targetBlock.push(block);
            }
          }
        }
      }
      resolve(true);
    })
  }
  private visitChestandCollect(chest: Block): Promise<boolean> {
    return new Promise((resolve, reject) => {
      super.bot.chat(`Visiting ${chest.position.x}, ${chest.position.y}, ${chest.position.z}`);
      
      super.bot.pathfinder.setGoal(new goals.GoalNear(chest.position.x, chest.position.y, chest.position.z, 4));

      once(super.bot, 'goal_reached')
      .then(() => {
        super.bot.openChest(chest)
        .then((window) => {
          window.items().forEach(item => {
            if (item.name in super.state.targetItem) {
              // work in progress
            }
          })
        })
      });
    })
  }
}

export default CollectFromChests;