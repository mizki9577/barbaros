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
      words: [],
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'ADD_WORD':
        return {
          ...state,
          words: [
            ...state.words,
            action.newWord,
          ],
        }

      case 'UPDATE_WORD':
        return {
          ...state,
          words: state.words.map(
            word => word !== action.word ? word : {
              ...word,
              ...action.payload,
            }
          )
        }

      default:
        return state
    }
  }
}

export default new Store(dispatcher)
// vim: set ts=2 sw=2 et:
