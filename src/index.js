/* @flow */

type Action<T, P> = { +type: T, +payload: P }
type EmptyAction<T> = { +type: T }
type Reducer<S, A> = (state: S, action: A) => S
type Handler<S> = {
  +reducer: Reducer<S, any>,
  +type: string,
}

type CreateAction = (
  <T: string>(type: T) => {
    (): EmptyAction<T>,
    +type: T,
    +handle: <S>(reducer: Reducer<S, EmptyAction<T>>) => {
      +reducer: Reducer<S, EmptyAction<T>>,
      +type: T,
    },
  }
) & (
  <T: string, D, P>(type: T, createPayload: (data: D) => P) => {
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

export const createAction: CreateAction = ((type, createPayload) => {
  const constructor = data => ({ type, payload: createPayload && createPayload(data) })
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
