# quick-action [![Build Status][status-img]][status-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/bigslycat/quick-action.svg)](https://greenkeeper.io/)

Flow support, no constants, really simple

## Installation

```
npm install --save quick-action
```

or

```
yarn add quick-action
```

## Usage

```js
import { createStore, combineReducers } from 'redux'
import { createAction, createReducer } from 'quick-action'

const increment = createAction('INCREMENT')
const decrement = createAction('DECREMENT')
const add = createAction('ADD')

const setName = createAction('SET_NAME', response => response.name)
const addFriend = createAction('ADD_FRIEND', response => response.name)

const counter =
  creatReducer(
    0,

    increment.handle(state => state + 1),
    decrement.handle(state => state - 1),
    add.handle((state, action) => state + action.payload),
  )

const user =
  creatReducer(
    { username: null, friends: [] },

    setName.handle(
      (state, action) => ({
        ...state,
        username: action.payload,
      }),
    ),

    addFriend.handle(
      (state, action) => ({
        ...state,
        friends: [
          ...state.friends,
          action.payload,
        ],
      }),
    ),
  )

const store = createStore(
  combineReducers({
    counter,
    user,
  }),
)

store.dispatch(increment()) // store.getState().counter === 1
store.dispatch(increment()) // store.getState().counter === 2
store.dispatch(decrement()) // store.getState().counter === 1
store.dispatch(add(2)) // store.getState().counter === 3

store.dispatch(setName({ name: 'joe' })) // store.getState().user === { username: 'joe', friends: [] }
store.dispatch(addFriend({ name: 'vasya' })) // store.getState().user === { username: 'joe', friends: ['vasya'] }
```

[status-url]: https://travis-ci.org/bigslycat/quick-action
[status-img]: https://travis-ci.org/bigslycat/quick-action.svg?branch=master
