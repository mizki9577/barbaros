import * as React from "react";
import { EditableText } from "@blueprintjs/core";
import makeSelector from "./makeSelector";
import { Word } from "./types";
import {
  hasPerson,
  hasNumber,
  hasTense,
  hasMood,
  hasVoice,
  hasGender,
  hasCase
} from "./utils";

const WordComponent = ({
  onChange,
  ...word
}: Word & { onChange: (obj: Partial<Word>) => void }) => (
  <div>
    <div>
      {"< "}
      <EditableText
        className="word-lemma"
        value={word.lemma}
        onChange={lemma => onChange({ lemma })}
      />
    </div>
    <EditableText
      className="word-text"
      value={word.text}
      onChange={text => onChange({ text })}
    />
    <WordAttributes onChange={onChange} {...word} />
    <EditableText
      className="word-translation"
      value={word.translation}
      onChange={translation => onChange({ translation })}
    />
  </div>
);

const WordAttributes = ({
  onChange,
  ...word
}: Word & { onChange: (obj: Partial<Word>) => void }) => (
  <div>
    <PosSelector
      value={word.pos}
      selectProps={{ minimal: true }}
      onChange={pos => onChange({ pos })}
    />
    <PersonSelector
      value={word.person}
      shown={hasPerson(word.pos, word.mood)}
      selectProps={{ minimal: true }}
      onChange={person => onChange({ person })}
    />
    <NumberSelector
      value={word.number_}
      shown={hasNumber(word.pos, word.mood)}
      selectProps={{ minimal: true }}
      onChange={number_ => onChange({ number_ })}
    />
    <TenseSelector
      value={word.tense}
      shown={hasTense(word.pos)}
      selectProps={{ minimal: true }}
      onChange={tense => onChange({ tense })}
    />
    <MoodSelector
      value={word.mood}
      shown={hasMood(word.pos)}
      selectProps={{ minimal: true }}
      onChange={mood => onChange({ mood })}
    />
    <VoiceSelector
      value={word.voice}
      shown={hasVoice(word.pos)}
      selectProps={{ minimal: true }}
      onChange={voice => onChange({ voice })}
    />
    <GenderSelector
      value={word.gender}
      shown={hasGender(word.pos)}
      selectProps={{ minimal: true }}
      onChange={gender => onChange({ gender })}
    />
    <CaseSelector
      value={word.case_}
      shown={hasCase(word.pos)}
      selectProps={{ minimal: true }}
      onChange={case_ => onChange({ case_ })}
    />
  </div>
);

const PosSelector = makeSelector("品詞", [
  ["adjective", "形容詞"],
  ["adverb", "副詞"],
  ["article", "冠詞"],
  ["noun", "名詞"],
  ["participle", "分詞"],
  ["particle", "小辞"],
  ["preposition", "前置詞"],
  ["pronoun", "代名詞"],
  ["verb", "動詞"]
]);

const PersonSelector = makeSelector("人称", [
  ["first", "1人称"],
  ["second", "2人称"],
  ["third", "3人称"]
]);

const NumberSelector = makeSelector("数", [
  ["singular", "単数"],
  ["dual", "双数"],
  ["plural", "複数"]
]);

const TenseSelector = makeSelector("時制", [
  ["present", "現在"],
  ["imperfect", "未完了過去"],
  ["future", "未来"],
  ["aorist", "アオリスト"],
  ["perfect", "完了"],
  ["pluperfect", "過去完了"],
  ["future-perfect", "未来完了"]
]);

const MoodSelector = makeSelector("法", [
  ["indicative", "直説法"],
  ["subjunctive", "接続法"],
  ["optative", "希求法"],
  ["infinitive", "不定法"]
]);

const VoiceSelector = makeSelector("相", [
  ["active", "能動相"],
  ["middle", "中動相"],
  ["passive", "受動相"]
]);

const GenderSelector = makeSelector("性", [
  ["masculine", "男性"],
  ["neuter", "中性"],
  ["feminine", "女性"]
]);

const CaseSelector = makeSelector("格", [
  ["nominative", "主格"],
  ["vocative", "呼格"],
  ["genitive", "属格"],
  ["dative", "与格"],
  ["accusative", "対格"],
  ["ablative", "奪格"]
]);

export default WordComponent;

// vim: set ts=2 sw=2 et:
