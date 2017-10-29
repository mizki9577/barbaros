// @flow
import type { Dispatcher, State, Action } from './types.js'

import { ReduceStore } from 'flux/utils'
import dispatcher from './dispatcher.js'

class Store extends ReduceStore {
  constructor(dispatcher: Dispatcher) {
    super(dispatcher)
    this.addListener(() => {
      window.localStorage.setItem('state', JSON.stringify(this.getState()))
    })
  }

  getInitialState() : State {
    const state = JSON.parse(window.localStorage.getItem('state'))
    return state ? state : {
      lines: [],
    }
  }

  reduce(state: State, action: Action) {
    switch (action.type) {
      case 'ADD_LINE':
        return {
          ...state,
          lines: [...state.lines, [{}]],
        }

      case 'ADD_WORD': {
        const _action = action // see https://github.com/facebook/flow/issues/4346
        return {
          ...state,
          lines: state.lines.map(
            line => line !== action.line ? line : [
              ...line,
              _action.word,
            ]
          ),
        }
      }

      case 'UPDATE_WORD': {
        const _action = action
        return {
          ...state,
          lines: state.lines.map(
            line => line !== action.line ? line : line.map(
              word => word !== action.word ? word : {
                ...word,
                ..._action.payload,
              }
            )
          ),
        }
      }

      default:
        return state
    }
  }
}

export default new Store(dispatcher)
// vim: set ts=2 sw=2 et:
