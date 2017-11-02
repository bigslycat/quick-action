/* @flow */

import type { CreateAction } from './types'

const identity = value => value

export const createAction: CreateAction = (type, createPayload = identity): any => {
  const constructor = data => ({ type, payload: createPayload(data) })
  constructor.type = type
  constructor.handle = reducer => ({ reducer, type })
  return constructor
}
