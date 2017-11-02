/* eslint-env jest */

import { createReducer } from './createReducer'

describe('createReducer()', () => {
  it('Receives initial state as first argument', () => {
    const reducer = createReducer('initial state')
    expect(reducer()).toEqual('initial state')
  })

  it('Receives handlers as others arguments, returns reduser', () => {
    const actionInvalid = { type: 'invalid' }
    const actionFirst = { type: 'first' }
    const actionSecond = { type: 'second' }

    const first = { type: 'first', reducer: jest.fn() }
    const second = { type: 'second', reducer: jest.fn() }

    const reducer = createReducer('initial state', first, second)

    expect(reducer(undefined, actionInvalid)).toEqual('initial state')
    expect(first.reducer).toHaveBeenCalledTimes(0)
    expect(second.reducer).toHaveBeenCalledTimes(0)

    jest.resetAllMocks()

    expect(reducer('given state', actionInvalid)).toEqual('given state')
    expect(first.reducer).toHaveBeenCalledTimes(0)
    expect(second.reducer).toHaveBeenCalledTimes(0)

    jest.resetAllMocks()

    first.reducer.mockReturnValue('first state')

    expect(reducer('blabla state', actionFirst)).toEqual('first state')
    expect(first.reducer).lastCalledWith('blabla state', actionFirst)
    expect(first.reducer).toHaveBeenCalledTimes(1)
    expect(second.reducer).toHaveBeenCalledTimes(0)

    jest.resetAllMocks()

    second.reducer.mockReturnValue('second state')

    expect(reducer(undefined, actionSecond)).toEqual('second state')
    expect(second.reducer).lastCalledWith('initial state', actionSecond)
    expect(first.reducer).toHaveBeenCalledTimes(0)
    expect(second.reducer).toHaveBeenCalledTimes(1)
  })
})
