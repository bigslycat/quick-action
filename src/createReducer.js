/* @flow */

import type { CreateReducer } from './types'

export const createReducer: CreateReducer = (initialState, ...handlers): any =>
  (state = initialState, action) => {
    for (
      let index = 0;
      index < handlers.length;
      index += 1
    ) {
      if (handlers[index].type === action.type) {
        return handlers[index].reducer(state, action)
      }
    }

    return state
  }
