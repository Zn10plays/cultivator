import { Bot } from 'mineflayer';
import { BehaviorIdle, NestedStateMachine, StateMachineTargets, StateTransition } from 'mineflayer-statemachine'
import createMineState from './states/mine';

export default function loadAllStates (bot: Bot) {

  const targets: StateMachineTargets = {};

  const idle = new BehaviorIdle();
  idle.stateName = 'Main Idle'

  const mine = createMineState(bot, targets);

  const transitions: StateTransition[] = [
    new StateTransition({
      parent: idle,
      child: mine,
      shouldTransition: () => false
    }),
    new StateTransition({
      parent: mine,
      child: idle,
      shouldTransition: () => false
    })
  ];

  const stateMachine = new NestedStateMachine(transitions, idle, idle);
}