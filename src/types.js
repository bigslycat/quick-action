/* @flow */

/* eslint max-len: off */

export interface Action<T, P> { +type: T, +payload: P }
export type Reducer<S, A> = (state: S, action: A) => S

type Handler<S, A: Action<string, any>> = {
  +reducer: Reducer<S, A>,
  +type: $PropertyType<A, 'type'>,
}

export type ActionCreator<T: string, D, P = D> = {
  +$call: (data: D) => Action<T, P>,
  +handle: <S>(reducer: (state: S, action: Action<T, P>) => S) => Handler<S, Action<T, P>>,
  +type: T,
}

export type CreateAction =
  (<T: string, D, P>(type: T) => ActionCreator<T, D, P>) &
  (<T: string, D, P>(type: T, createPayload: (data: D) => P) => ActionCreator<T, D, P>)

type State = void | null | string | number | Object | State[]
type StateConstructor<S: State> = () => S

export type CreateReducer = (
  <S: State>(createInitialState: StateConstructor<S>, ...handlers: Handler<S, Action<any, any>>[]) =>
    Reducer<S, Action<string, any>>
) & (
  <S: State>(initialState: S, ...handlers: Handler<S, Action<any, any>>[]) =>
    Reducer<S, Action<string, any>>
)
