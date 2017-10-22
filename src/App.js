import React from 'react'
import { Container } from 'flux/utils'
import AutosizeInput from 'react-input-autosize'

import convertFluxContainer from './convertFluxContainer.js'

import store from './store.js'
import * as actions from './actions.js'

class App extends React.Component {
  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  render() {
    return (
      <div className="root">
        { this.state.words.map((word, i) => <Word key={ i } word={ word } />) }
        <button onClick={ () => actions.addWord() }>add a word</button>
      </div>
    )
  }
}

const Word = ({ word }) => (
  <div className="word">
    <AutosizeInput className="text" style={{ fontSize: '10pt' }} value={ word.text } onChange={ ev => actions.updateWord(word, { text: ev.target.value }) } />
    <AutosizeInput className="translated" style={{ fontSize: '10pt' }} value={ word.translated } onChange={ ev => actions.updateWord(word, { translated: ev.target.value }) } />

    <div className="selectors">
    <CategorySelector category={ word.category } onChange={ category => actions.updateWord(word, { category }) } />

    { ['noun', 'verb', 'adjective', 'particle', 'article', 'pronoun'].includes(word.category)
      ? <NumberSelector number={ word.number } onChange={ number => actions.updateWord(word, { number }) } />
      : null }

  { ['noun', 'adjective', 'particle', 'article', 'pronoun'].includes(word.category)
      ? <GenderSelector gender={ word.gender } onChange={ gender => actions.updateWord(word, { gender }) } />
      : null }

  { ['noun', 'adjective', 'particle', 'article', 'pronoun', 'preposition'].includes(word.category)
      ? <CaseSelector case={ word.case } onChange={ kase => actions.updateWord(word, { case: kase }) } />
      : null }

  { ['verb', 'particle'].includes(word.category)
      ? <PersonSelector person={ word.person } onChange={ person => actions.updateWord(word, { person }) } />
      : null }

  { ['verb', 'particle', 'infinitive'].includes(word.category)
      ? <TenseSelector tense={ word.tense } onChange={ tense => actions.updateWord(word, { tense }) } />
      : null }

  { ['verb', 'particle'].includes(word.category)
      ? <MoodSelector mood={ word.mood } onChange={ mood => actions.updateWord(word, { mood }) } />
      : null }

  { ['verb', 'particle', 'infinitive'].includes(word.category)
      ? <VoiceSelector voice={ word.voice } onChange={ voice => actions.updateWord(word, { voice }) } />
      : null }

  { ['adjective'].includes(word.category)
      ? <ComparisonSelector comparison={ word.comparison } onChange={ comparison => actions.updateWord(word, { comparison }) } />
      : null }
    </div>
  </div>
)

const CategorySelector = ({ category, onChange }) => (
  <select value={ category } onChange={ ev => onChange(ev.target.value) }>
    <option value="noun"       >noun</option>
    <option value="verb"       >verb</option>
    <option value="adjective"  >adj.</option>
    <option value="particle"   >part.</option>
    <option value="article"    >a.</option>
    <option value="pronoun"    >pron.</option>
    <option value="preposition">prep.</option>
    <option value="adverb"     >adv.</option>
    <option value="conjunction">conj.</option>
    <option value="infinitive" >inf.</option>
    <option value="punctuation">punc.</option>
  </select>
)

const NumberSelector = ({ number, onChange }) => (
  <select value={ number } onChange={ ev => onChange(ev.target.value) }>
    <option value="singular">sg.</option>
    <option value="dual">du</option>
    <option value="plural">pl.</option>
  </select>
)

const GenderSelector = ({ gender, onChange }) => (
  <select value={ gender } onChange={ ev => onChange(ev.target.value) }>
    <option value="masculine">m.</option>
    <option value="feminine">f.</option>
    <option value="neuter">n.</option>
  </select>
)

const CaseSelector = ({ case: kase, onChange }) => (
  <select value={ kase } onChange={ ev => onChange(ev.target.value) }>
    <option value="nominative"  >nom.</option>
    <option value="accusative"  >acc.</option>
    <option value="dative"      >dat.</option>
    <option value="ablative"    >abl.</option>
    <option value="genitive"    >gen.</option>
    <option value="vocative"    >voc.</option>
    <option value="locative"    >loc.</option>
    <option value="instrumental">ins.</option>
  </select>
)

const PersonSelector = ({ person, onChange }) => (
  <select value={ person } onChange={ ev => onChange(ev.target.value) }>
    <option value={ 1 }>1</option>
    <option value={ 2 }>2</option>
    <option value={ 3 }>3</option>
  </select>
)

const TenseSelector = ({ tense, onChange }) => (
  <select value={ tense } onChange={ ev => onChange(ev.target.value) }>
    <option value="present"       >pres.</option>
    <option value="imperfect"     >impf.</option>
    <option value="perfect"       >pf.</option>
    <option value="future"        >fut.</option>
    <option value="pluperfect"    >plpf.</option>
    <option value="aorist"        >aor.</option>
  </select>
)

const MoodSelector = ({ mood, onChange }) => (
  <select value={ mood } onChange={ ev => onChange(ev.target.value) }>
    <option value="indicative" >ind.</option>
    <option value="imperative" >imp.</option>
    <option value="subjunctive">subj.</option>
    <option value="optative"   >opt.</option>
  </select>
)

const VoiceSelector = ({ voice, onChange }) => (
  <select value={ voice } onChange={ ev => onChange(ev.target.value) }>
    <option value="active">act.</option>
    <option value="passive">pass.</option>
    <option value="middle">mid.</option>
  </select>
)

const ComparisonSelector = ({ comparison, onChange }) => (
  <select value={ comparison } onChange={ ev => onChange(ev.target.value) }>
    <option value="positive">pos.</option>
    <option value="comparative">comp.</option>
    <option value="superlative">sup.</option>
  </select>
)

export default Container.create(convertFluxContainer(App))
// vim: set ts=2 sw=2 et:
