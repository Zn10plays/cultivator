import { NestedStateMachine } from "mineflayer-statemachine"
import FarmingBehavior from "./farming"
import { Bot } from "mineflayer"
import data from "minecraft-data";

function initState(bot: Bot) {
  const mcData = data(bot.version);
  const target = {}

  const farm = FarmingBehavior(bot, target)
}

export default initState