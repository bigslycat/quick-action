/* eslint-env jest */

import { createAction } from './createAction'

describe('createAction', () => {
  it('Creates action creator', () => {
    const inc = createAction('inc')
    expect(inc).toBeInstanceOf(Function)
  })

  describe('When action creator created without payload constructor', () => {
    describe('When action creator called without arguments', () => {
      it('Creates action without payload', () => {
        const inc = createAction('inc')
        expect(inc()).toEqual({ type: 'inc' })
      })
    })

    describe('When action creator called with arguments', () => {
      it('Creates action without payload', () => {
        const inc = createAction('inc')
        expect(inc()).toEqual({ type: 'inc' })
      })
    })
  })

  describe('When action creator created with payload constructor', () => {
    it('Creates action without payload as result of payload constructor', () => {
      const addMinutes = createAction('addMinutes', num => num * 3600)
      expect(addMinutes(2)).toEqual({ type: 'addMinutes', payload: 7200 })
    })
  })


  it('Action creator have type property', () => {
    const type = 'inc'
    const inc = createAction(type)
    expect(inc.type).toBe(type)
  })

  it('Action creator have handle() nethod', () => {
    const inc = createAction('inc')
    expect(inc.handle).toBeInstanceOf(Function)
  })

  describe('handle() method', () => {
    it('Receives reducer and returns object with type property and reducer', () => {
      const reducer = 'reducer'
      const type = 'inc'
      const inc = createAction(type)
      expect(inc.handle(reducer)).toEqual({ type, reducer })
    })
  })
})
