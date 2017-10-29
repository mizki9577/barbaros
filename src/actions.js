// @flow
import type { Line, Word, Action } from './types.js'
import dispatcher from './dispatcher.js'

const dispatch = (action: Action) => dispatcher.dispatch(action)

export const addLine = () => {
  dispatch({
    type: 'ADD_LINE',
  })
}

export const addWord = (line: Line) => {
  dispatch({
    type: 'ADD_WORD',
    line,
    word: {
      category: 'noun',
      text: '',
      lemma: '',
      translated: '',
    },
  })
}

export const updateWord = (line: Line, word: Word, payload: $Shape<Word>) => {
  dispatch({
    type: 'UPDATE_WORD',
    line, word, payload,
  })
}
// vim: set ts=2 sw=2 et:
