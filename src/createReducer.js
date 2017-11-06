/* @flow */

import type { CreateReducer } from './types'

export const createReducer: CreateReducer = (init, ...handlers): any =>
  (state = typeof init === 'function' ? init() : init, action) => {
    for (
      let index = 0;
      index < handlers.length;
      index += 1
    ) {
      if (action && handlers[index].type === action.type) {
        return handlers[index].reducer(state, action)
      }
    }

    return state
  }
