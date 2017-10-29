// @flow
export type { Dispatcher } from 'flux'
export type State = {|
  lines: Line[],
|}

export type Line = Word[]

export type Word = {
  category: Category,
  text: string,
  lemma: string,
  translated: string,
} & $Shape<{
  number: Number,
  gender: Gender,
  case: Case,
  person: Person,
  tense: Tense,
  mood: Mood,
  voice: Voice,
  comparison: Comparison,
}>

type Category = 'noun' | 'verb' | 'adjective' | 'participle' | 'article' | 'pronoun' | 'preposition' | 'adverb' | 'conjunction' | 'infinitive' | 'particle' | 'punctuation'
type Number = 'singular' | 'dual' | 'plural'
type Gender = 'masculine' | 'feminine' | 'neuter'
type Case = 'nominative' | 'accusative' | 'dative' | 'ablative' | 'genitive' | 'vocative' | 'locative' | 'instrumental'
type Person = 1 | 2 | 3
type Tense = 'present' | 'past' | 'imperfect' | 'perfect' | 'future' | 'pluperfect' | 'aorist'
type Mood = 'indicative' | 'imperative' | 'subjunctive' | 'optative'
type Voice = 'active' | 'passive' | 'middle'
type Comparison = 'positive' | 'comperative' | 'superlative'

type AddLine = {
  type: 'ADD_LINE',
}

type AddWord = {
  type: 'ADD_WORD',
  line: Line,
  word: Word,
}

type UpdateWord = {
  type: 'UPDATE_WORD',
  line: Line,
  word: Word,
  payload: $Shape<Word>,
}

export type Action = AddLine | AddWord | UpdateWord
// vim: set ts=2 sw=2 et:
