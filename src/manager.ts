import { Bot } from 'mineflayer';
import { BehaviorIdle, BotStateMachine, NestedStateMachine, StateMachineTargets, StateMachineWebserver, StateTransition } from 'mineflayer-statemachine'
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

  bot.once('spawn', () => {
    bot.on('chat', (username, message) => {
      if (username !== 'Mock2ek' || !message.startsWith('!')) return;

      switch (message) {
        case '!mine':
          transitions[0].trigger();          
          break;
        case '!stop': 
        transitions[1].trigger()
        break;
        default:
          break;
      }
    })
  })

  const root = new NestedStateMachine(transitions, idle);
  const stateMachine = new BotStateMachine(bot, root);
  const webServer = new StateMachineWebserver(bot, stateMachine);
  webServer.startServer();
}