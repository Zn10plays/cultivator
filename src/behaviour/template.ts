import { Block } from 'prismarine-block'
import { Bot } from "mineflayer";
import { Item } from "prismarine-item";

class Behaviour {
  stateName: string;
  currentState: {
    targetBlock:  Block[],
    targetPlayer: {}[],
    targetItem:  string[],
  };
  bot: Bot;

  public constructor(name, state, bot: Bot) {
    this.stateName = name;
    this.currentState = state;
    this.bot = bot;
  }

  public hasRequirements() {
    return true;
  }

  public execute() {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }

  public abort() {
    return new Promise((resolve, reject) => {
      resolve(true);
    })
  }
  
  public get name(): string {
    return this.stateName
  }

  public get state() {
    return this.currentState;
  }
}

export default Behaviour;