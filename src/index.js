/* @flow */

type Action<T, P> = { +type: T, +payload: P }
type Reducer<S, A> = (state: S, action: A) => S
type Handler<S> = {
  +reducer: Reducer<S, any>,
  +type: string,
}

type CreateAction = (
  <T: string, D, P>(type: T, createPayload?: (data: D) => P) => {
    (data: D): Action<T, P>,
    +type: T,
    +handle: <S>(reducer: Reducer<S, Action<T, P>>) => {
      +reducer: Reducer<S, Action<T, P>>,
      +type: T,
    },
  }
)

type CreateReducer =
  <S>(initialState: S, ...handlers: Handler<S>[]) =>
   <A>(state: S, action: A) => S

const identity = value => value

export const createAction: CreateAction = ((type, createPayload = identity) => {
  const constructor = data => ({ type, payload: createPayload(data) })
  constructor.type = type
  constructor.handle = reducer => ({ reducer, type })
  return constructor
}: any)

export const createReducer: CreateReducer = ((initialState, ...handlers) =>
  (state = initialState, action) => {
    let entry

    for (let index = 0; index < handlers.length; index += 1) {
      if (handlers[index].type === action.type) {
        entry = handlers[index]
        break
      }
    }

    if (!entry) return state

    return entry.reducer(state, action)
  }: any)
