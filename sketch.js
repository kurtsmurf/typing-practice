// Sketching out alternative finite state machine

const states = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
  KEY_PLAYED: 'KEY_PLAYED',
}

const events = {
  RESET: 'RESET',
  KEY_DOWN: 'KEY_DOWN',
}

const machine = {
  initial: states.READY,
  context: {
    position: 0
  },
  states: {
    [states.READY]: {
      on: { [events.KEY_DOWN]: { target: states.KEY_PLAYED }, }
    },
    [states.PLAYING]: {
      on: {
        [events.KEY_DOWN]: { target: states.KEY_PLAYED },
        [events.RESET]: { target: states.READY }
      }
    },
    [states.WON]: {
      on: { [events.RESET]: { target: states.READY } }
    },
    [states.LOST]: {
      on: { [events.RESET]: { target: states.READY } }
    },
    [states.KEY_PLAYED]: {
      on: {
        '': [
          {
            target: states.LOST,
            cond: 'keyIsWrong'
          },
          {
            target: states.PLAYING,
            // cond: 'keyIsRight' and not 'keyIsLast' ??

            // In XState conditions are stored in the machine as objects and then looked up elsewhere (I'm assuming).
            // How do I combine conditions with logical operators like 'and' and 'or'?
          },
          {
            target: states.WON,
            //cond: 'keyIsRight' and 'keyIsLast' ??
          }
        ]
      }
    },
  }
}