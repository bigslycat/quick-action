/* @flow */

export interface Action<T, P> { +type: T, +payload: P }
export type ActionCreator<T, D, P = D> = (data: D) => Action<T, P>
export type Reducer<S, A> = (state: S, action: A) => S

type Handler<S> = {
  +reducer: Reducer<S, any>,
  +type: string,
}

export type CreateAction = (
  <T: string, D, P>(type: T, createPayload: (data: D) => P) => {
    +$call: ActionCreator<T, D, P>,
    +type: T,
    +handle: <S>(reducer: Reducer<S, Action<T, P>>) => {
      +reducer: Reducer<S, Action<T, P>>,
      +type: T,
    },
  }
) & (
  <T: string, D>(type: T) => {
    +$call: ActionCreator<T, D>,
    +type: T,
    +handle: <S>(reducer: Reducer<S, Action<T, D>>) => {
      +reducer: Reducer<S, Action<T, D>>,
      +type: T,
    },
  }
)

export type CreateReducer =
  <S>(initialState: S, ...handlers: Handler<S>[]) =>
   <A>(state: S, action: A) => S
