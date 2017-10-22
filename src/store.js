import { ReduceStore } from 'flux/utils'
import dispatcher from './dispatcher.js'

class Store extends ReduceStore {
  constructor(dispatcher) {
    super(dispatcher)
    this.addListener(() => {
      window.localStorage.setItem('state', JSON.stringify(this.getState()))
    })
  }

  getInitialState() {
    const state = JSON.parse(window.localStorage.getItem('state'))
    return state ? state : {
      lines: [],
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'ADD_LINE':
        return {
          ...state,
          lines: [...state.lines, [{}]],
        }

      case 'ADD_WORD':
        return {
          ...state,
          lines: state.lines.map(
            line => line !== action.line ? line : [
              ...line,
              action.word,
            ]
          ),
        }

      case 'UPDATE_WORD':
        return {
          ...state,
          lines: state.lines.map(
            line => line.map(
              word => word !== action.word ? word : {
                ...word,
                ...action.payload,
              }
            )
          ),
        }

      default:
        return state
    }
  }
}

export default new Store(dispatcher)
// vim: set ts=2 sw=2 et:
