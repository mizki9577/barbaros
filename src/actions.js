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

export const updateWord = (line, word, payload) => {
  dispatcher.dispatch({
    type: 'UPDATE_WORD',
    line, word, payload,
  })
}
// vim: set ts=2 sw=2 et:
