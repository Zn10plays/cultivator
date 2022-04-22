import { BehaviorEquipItem, 
  BehaviorFindBlock, 
  BehaviorIdle, 
  NestedStateMachine, 
  StateMachineTargets, 
  StateTransition, 
  BehaviorMoveTo,
  BehaviorMineBlock,
  BehaviorGetClosestEntity,
  EntityFilters,
  BehaviorFollowEntity
} from 'mineflayer-statemachine'
import MinecraftData from 'minecraft-data';
import { Bot } from 'mineflayer';


function createMineState(bot: Bot, targets: StateMachineTargets): NestedStateMachine {
  const mcData = MinecraftData(bot.version)

  const enter = new BehaviorIdle();
  enter.stateName = 'MainState';

  const findOre = new BehaviorFindBlock(bot, targets)
  findOre.blocks = mcData.blocksArray.filter(block => block.name.includes('ore')).map(block => block.id);
  findOre.maxDistance = 20;

  const move = new BehaviorMoveTo(bot, targets) 
  move.stateName = 'Move To Ore';

  const mine = new BehaviorMineBlock(bot, targets)
  mine.stateName = 'Mine The Ore';

  const findDrop = new BehaviorGetClosestEntity(bot, targets, EntityFilters().ItemDrops);
  findDrop.stateName = 'Find the Drop';

  const moveToDrop = new BehaviorFollowEntity(bot, targets);
  moveToDrop.stateName = 'collect the drop';

  const transitions: StateTransition[] = [
    new StateTransition({
      parent: enter,
      child: findOre,
      shouldTransition: () => true
    }),

    new StateTransition({
      parent: findOre,
      child: move,
      shouldTransition: () => !(targets.position == null) && !(targets.item == null)
    }),

    new StateTransition({
      parent: move,
      child: mine,
      shouldTransition: () => (targets.position.distanceTo(bot.entity.position) < 3 && bot.canSeeBlock(bot.blockAt(targets.position)))
    }),

    new StateTransition({
      parent: mine,
      child: findDrop,
      shouldTransition: () => mine.isFinished
    }),

    new StateTransition({
      parent: findDrop, 
      child: moveToDrop,
      shouldTransition: () => moveToDrop.distanceToTarget() > 1
    }),

    new StateTransition({
      parent: moveToDrop,
      child: enter,
      shouldTransition: () => false
    })
  ]

  const stateMachine = new NestedStateMachine(transitions, enter, enter)
  stateMachine.stateName = 'Mine State'
  return stateMachine;
}

export default createMineState;