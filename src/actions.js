import dispatcher from './dispatcher.js'

export const addWord = (newWord = {}) => {
  dispatcher.dispatch({
    type: 'ADD_WORD',
    newWord: {
      text: '',
      category: 'unknown',
      ...newWord,
    },
  })
}

export const updateWord = (word, payload) => {
  dispatcher.dispatch({
    type: 'UPDATE_WORD',
    word, payload,
  })
}
