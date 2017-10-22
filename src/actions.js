import dispatcher from './dispatcher.js'

export const addLine = () => {
  dispatcher.dispatch({
    type: 'ADD_LINE',
  })
}

export const addWord = (line) => {
  dispatcher.dispatch({
    type: 'ADD_WORD',
    line,
    word: {
      category: 'noun',
    },
  })
}

export const updateWord = (word, payload) => {
  dispatcher.dispatch({
    type: 'UPDATE_WORD',
    word, payload,
  })
}
// vim: set ts=2 sw=2 et:
