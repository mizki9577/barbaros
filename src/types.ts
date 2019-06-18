export type Line = {
  words: Word[];
  translation: string;
};

export type Word = {
  text?: string;
  lemma?: string;
  translation?: string;
  pos?: Pos;
  gender?: Gender;
  number_?: Number_;
  case_?: Case;
  person?: Person;
  tense?: Tense;
  mood?: Mood;
  voice?: Voice;
};

export type Pos =
  | "adjective"
  | "adverb"
  | "article"
  | "conjunction"
  | "interjection"
  | "noun"
  | "participle"
  | "particle"
  | "preposition"
  | "pronoun"
  | "verb";

export type Person = "first" | "second" | "third";
export type Number_ = "singular" | "dual" | "plural";
export type Gender = "masculine" | "feminine" | "neuter";
export type Case =
  | "nominative"
  | "accusative"
  | "dative"
  | "genitive"
  | "ablative"
  | "vocative";
export type Tense =
  | "present"
  | "imperfect"
  | "future"
  | "aorist"
  | "perfect"
  | "pluperfect"
  | "future-perfect";
export type Mood = "indicative" | "subjunctive" | "optative" | "infinitive";
export type Voice = "active" | "middle" | "passive";

// vim: set ts=2 sw=2 et:
