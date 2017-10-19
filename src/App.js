import React from 'react'
import { Container } from 'flux/utils'

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

const Word = ({ word }) => {
  return (
    <div className="word">
      <input className="text" type="text" value={ word.text } onChange={ ev => actions.updateWord(word, { text: ev.target.value }) } />

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

        { ['verb', 'particle'].includes(word.category)
          ? <TenseSelector tense={ word.tense } onChange={ tense => actions.updateWord(word, { tense }) } />
          : null }

        { ['verb', 'particle'].includes(word.category)
          ? <MoodSelector mood={ word.mood } onChange={ mood => actions.updateWord(word, { mood }) } />
          : null }

        { ['verb', 'particle'].includes(word.category)
          ? <VoiceSelector voice={ word.voice } onChange={ voice => actions.updateWord(word, { voice }) } />
          : null }

        { ['adjective'].includes(word.category)
          ? <ComparisonSelector comparison={ word.comparison } onChange={ comparison => actions.updateWord(word, { comparison }) } />
          : null }
      </div>
    </div>
  )
}

const CategorySelector = ({ category, onChange }) => (
  <select value={ category } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown"    >CATEGORY</option>
    <option value="noun"       >noun</option>
    <option value="verb"       >verb</option>
    <option value="adjective"  >adjective</option>
    <option value="particle"   >particle</option>
    <option value="article"    >article</option>
    <option value="pronoun"    >pronoun</option>
    <option value="preposition">preposition</option>
    <option value="adverb"     >adverb</option>
    <option value="conjunction">conjunction</option>
  </select>
)

const NumberSelector = ({ number, onChange }) => (
  <select value={ number } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown">NUMBER</option>
    <option value="singular">singular</option>
    <option value="dual">dual</option>
    <option value="plural">plural</option>
  </select>
)

const GenderSelector = ({ gender, onChange }) => (
  <select value={ gender } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown">GENDER</option>
    <option value="masculine">masculine</option>
    <option value="feminine">feminine</option>
    <option value="neuter">neuter</option>
  </select>
)

const CaseSelector = ({ case: kase, onChange }) => (
  <select value={ kase } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown"     >CASE</option>
    <option value="nominative"  >nominative</option>
    <option value="accusative"  >accusative</option>
    <option value="dative"      >dative</option>
    <option value="ablative"    >ablative</option>
    <option value="genitive"    >genitive</option>
    <option value="vocative"    >vocative</option>
    <option value="locative"    >locative</option>
    <option value="instrumental">instrumental</option>
  </select>
)

const PersonSelector = ({ person, onChange }) => (
  <select value={ person } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown">PERSON</option>
    <option value={ 1 }>1</option>
    <option value={ 2 }>2</option>
    <option value={ 3 }>3</option>
  </select>
)

const TenseSelector = ({ tense, onChange }) => (
  <select value={ tense } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown"       >TENSE</option>
    <option value="present"       >present</option>
    <option value="imperfect"     >imperfect</option>
    <option value="perfect"       >perfect</option>
    <option value="future"        >future</option>
    <option value="pluperfect"    >pluperfect</option>
    <option value="future perfect">future perfect</option>
    <option value="aorist"        >aorist</option>
  </select>
)

const MoodSelector = ({ mood, onChange }) => (
  <select value={ mood } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown"    >MOOD</option>
    <option value="indicative" >indicative</option>
    <option value="imperative" >imperative</option>
    <option value="subjunctive">subjunctive</option>
    <option value="optative"   >optative</option>
  </select>
)

const VoiceSelector = ({ voice, onChange }) => (
  <select value={ voice } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown">VOICE</option>
    <option value="active">active</option>
    <option value="passive">passive</option>
    <option value="middle">middle</option>
  </select>
)

const ComparisonSelector = ({ comparison, onChange }) => (
  <select value={ comparison } onChange={ ev => onChange(ev.target.value) }>
    <option value="unknown">COMPARISON</option>
    <option value="positive">positive</option>
    <option value="comparative">comparative</option>
    <option value="superlative">superlative</option>
  </select>
)

export default Container.create(convertFluxContainer(App))
