import React from "react";
import AutosizeInput from "react-input-autosize";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    try {
      const savedState = JSON.parse(window.localStorage.getItem("state"));
      if (savedState == null) {
        this.state = {
          lines: [
            {
              words: [defaultWord()],
              translation: ""
            }
          ]
        };
      } else {
        this.state = savedState;
      }
    } catch (e) {
      this.state = {
        lines: [
          {
            words: [defaultWord()],
            translation: ""
          }
        ]
      };
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem("state", JSON.stringify(this.state));
  }

  updateTranslation(lineIndex, translation) {
    const linesHead = this.state.lines.slice(0, lineIndex);
    const theLine = this.state.lines[lineIndex];
    const linesTail = this.state.lines.slice(lineIndex + 1);
    this.setState({
      lines: [
        ...linesHead,
        {
          ...theLine,
          translation
        },
        ...linesTail
      ]
    });
  }

  addLine() {
    this.setState({
      lines: [...this.state.lines, {}]
    });
  }

  addWord(lineIndex) {
    const linesHead = this.state.lines.slice(0, lineIndex);
    const theLine = this.state.lines[lineIndex];
    const linesTail = this.state.lines.slice(lineIndex + 1);
    this.setState({
      lines: [
        ...linesHead,
        {
          ...theLine,
          words: [...theLine.words, defaultWord()]
        },
        ...linesTail
      ]
    });
  }

  updateWord(lineIndex, wordIndex, diff) {
    const linesHead = this.state.lines.slice(0, lineIndex);
    const theLine = this.state.lines[lineIndex];
    const linesTail = this.state.lines.slice(lineIndex + 1);

    const wordsHead = theLine.words.slice(0, wordIndex);
    const theWord = theLine.words[wordIndex];
    const wordsTail = theLine.words.slice(wordIndex + 1);

    this.setState({
      lines: [
        ...linesHead,
        {
          ...theLine,
          words: [...wordsHead, { ...theWord, ...diff }, ...wordsTail]
        },
        ...linesTail
      ]
    });
  }

  deleteWord(lineIndex, wordIndex) {
    const linesHead = this.state.lines.slice(0, lineIndex);
    const theLine = this.state.lines[lineIndex];
    const linesTail = this.state.lines.slice(lineIndex + 1);

    const wordsHead = theLine.words.slice(0, wordIndex);
    const wordsTail = theLine.words.slice(wordIndex + 1);

    this.setState({
      lines: [
        ...linesHead,
        {
          ...theLine,
          words: [...wordsHead, ...wordsTail]
        },
        ...linesTail
      ]
    });
  }

  importFromString() {
    const lines = [];
    while (true) {
      const line = window.prompt("text to import (leave empty to finish):");
      if (0 < line.length) {
        lines.push(line.trim());
      } else {
        break;
      }
    }
    this.setState({
      lines: lines.map(line => ({
        words: line.split(/ +/).map(word => defaultWord(word)),
        translation: ""
      }))
    });
  }

  render() {
    return (
      <>
        {this.state.lines.map((line, i) => (
          <Line
            key={i}
            line={line}
            updateTranslation={translation =>
              this.updateTranslation(i, translation)
            }
            addWord={() => this.addWord(i)}
            updateWord={(wordIndex, diff) =>
              this.updateWord(i, wordIndex, diff)
            }
            deleteWord={wordIndex => this.deleteWord(i, wordIndex)}
          />
        ))}
        <button onClick={() => this.addLine()}>new line</button>
        <button onClick={() => this.importFromString()}>import</button>
      </>
    );
  }
}

const Line = ({ line, updateTranslation, addWord, updateWord, deleteWord }) => (
  <div className="line-wrapper">
    <div className="line">
      {line.words.map((word, i) => (
        <Word
          key={i}
          word={word}
          updateWord={diff => updateWord(i, diff)}
          deleteWord={() => deleteWord(i)}
        />
      ))}
      <button onClick={addWord}>new word</button>
    </div>
    <AutosizeInput
      value={line.translation}
      onChange={ev => updateTranslation(ev.target.value)}
    />
  </div>
);

const Word = ({ word, updateWord }) => (
  <div className="word">
    <span className={"lemma" + (word.lemma ? "" : " noprint")}>{"<"}</span>
    <AutosizeInput
      className="lemma"
      value={word.lemma}
      onChange={ev => updateWord({ lemma: ev.target.value })}
    />
    <AutosizeInput
      className="text"
      value={word.text}
      onChange={ev => updateWord({ text: ev.target.value })}
    />
    <AutosizeInput
      className="translated"
      value={word.translated}
      onChange={ev => updateWord({ translated: ev.target.value })}
    />

    <div className="selectors">
      <CategorySelector
        category={word.category}
        onChange={category => updateWord({ category })}
      />

      {[
        "noun",
        "verb",
        "adjective",
        "participle",
        "article",
        "pronoun"
      ].includes(word.category) ? (
        <NumberSelector
          number={word.number}
          onChange={number => updateWord({ number })}
        />
      ) : null}

      {["noun", "adjective", "participle", "article", "pronoun"].includes(
        word.category
      ) ? (
        <GenderSelector
          gender={word.gender}
          onChange={gender => updateWord({ gender })}
        />
      ) : null}

      {[
        "noun",
        "adjective",
        "participle",
        "article",
        "pronoun",
        "preposition"
      ].includes(word.category) ? (
        <CaseSelector
          case={word.case}
          onChange={kase => updateWord({ case: kase })}
        />
      ) : null}

      {["verb"].includes(word.category) ? (
        <PersonSelector
          person={word.person}
          onChange={person => updateWord({ person })}
        />
      ) : null}

      {["verb", "participle", "infinitive"].includes(word.category) ? (
        <TenseSelector
          tense={word.tense}
          onChange={tense => updateWord({ tense })}
        />
      ) : null}

      {["verb"].includes(word.category) ? (
        <MoodSelector
          mood={word.mood}
          onChange={mood => updateWord({ mood })}
        />
      ) : null}

      {["verb", "participle", "infinitive"].includes(word.category) ? (
        <VoiceSelector
          voice={word.voice}
          onChange={voice => updateWord({ voice })}
        />
      ) : null}

      {["adjective"].includes(word.category) ? (
        <ComparisonSelector
          comparison={word.comparison}
          onChange={comparison => updateWord({ comparison })}
        />
      ) : null}
    </div>
  </div>
);

const CategorySelector = ({ category, onChange }) => (
  <select value={category} onChange={ev => onChange(ev.target.value)}>
    <option value="noun">noun</option>
    <option value="verb">verb</option>
    <option value="adjective">adj.</option>
    <option value="participle">part.</option>
    <option value="article">a.</option>
    <option value="pronoun">pron.</option>
    <option value="preposition">prep.</option>
    <option value="adverb">adv.</option>
    <option value="conjunction">conj.</option>
    <option value="infinitive">inf.</option>
    <option value="particle">ptcl.</option>
    <option value="interjection">interj.</option>
    <option value="negator">neg.</option>
    <option value="punctuation">punc.</option>
  </select>
);

const NumberSelector = ({ number, onChange }) => (
  <select value={number} onChange={ev => onChange(ev.target.value)}>
    <option value="singular">sg.</option>
    <option value="dual">du</option>
    <option value="plural">pl.</option>
  </select>
);

const GenderSelector = ({ gender, onChange }) => (
  <select value={gender} onChange={ev => onChange(ev.target.value)}>
    <option value="masculine">m.</option>
    <option value="feminine">f.</option>
    <option value="neuter">n.</option>
  </select>
);

const CaseSelector = ({ case: kase, onChange }) => (
  <select value={kase} onChange={ev => onChange(ev.target.value)}>
    <option value="nominative">nom.</option>
    <option value="accusative">acc.</option>
    <option value="dative">dat.</option>
    <option value="ablative">abl.</option>
    <option value="genitive">gen.</option>
    <option value="vocative">voc.</option>
    <option value="locative">loc.</option>
    <option value="instrumental">ins.</option>
  </select>
);

const PersonSelector = ({ person, onChange }) => (
  <select value={person} onChange={ev => onChange(ev.target.value)}>
    <option value={1}>1&nbsp;</option>
    <option value={2}>2&nbsp;</option>
    <option value={3}>3&nbsp;</option>
  </select>
);

const TenseSelector = ({ tense, onChange }) => (
  <select value={tense} onChange={ev => onChange(ev.target.value)}>
    <option value="present">pres.</option>
    <option value="past">past</option>
    <option value="imperfect">impf.</option>
    <option value="perfect">perf.</option>
    <option value="future">fut.</option>
    <option value="pluperfect">plpf.</option>
    <option value="aorist">aor.</option>
  </select>
);

const MoodSelector = ({ mood, onChange }) => (
  <select value={mood} onChange={ev => onChange(ev.target.value)}>
    <option value="indicative">ind.</option>
    <option value="imperative">imp.</option>
    <option value="subjunctive">subj.</option>
    <option value="optative">opt.</option>
  </select>
);

const VoiceSelector = ({ voice, onChange }) => (
  <select value={voice} onChange={ev => onChange(ev.target.value)}>
    <option value="active">act.</option>
    <option value="passive">pass.</option>
    <option value="middle">mid.</option>
  </select>
);

const ComparisonSelector = ({ comparison, onChange }) => (
  <select value={comparison} onChange={ev => onChange(ev.target.value)}>
    <option value="positive">pos.</option>
    <option value="comparative">comp.</option>
    <option value="superlative">sup.</option>
  </select>
);

const defaultWord = (text = "") => ({
  category: "noun",
  text,
  lemma: "",
  translated: ""
});

// vim: set ts=2 sw=2 et:
