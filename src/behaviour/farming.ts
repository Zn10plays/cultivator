import { BehaviorEquipItem, BehaviorMoveTo, StateTransition, BehaviorFindBlock } from 'mineflayer-statemachine'
import { Bot } from 'mineflayer'

function FarmingBehavior(bot, state) {
  const target = {}
  const findBlock = new BehaviorFindBlock(bot, target)
}

export default FarmingBehavior