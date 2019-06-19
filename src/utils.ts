import { Word, Line, Pos, Mood } from "./types";

export const makeWord = (text: string): Word => ({ text });
export const makeLine = (words: Word[]): Line => ({ words, translation: "" });

export const hasPerson = (pos?: Pos, mood?: Mood) => {
  return pos === "verb" && mood !== "infinitive";
};

export const hasNumber = (pos?: Pos, mood?: Mood) =>
  pos === "adjective" ||
  pos === "article" ||
  pos === "noun" ||
  pos === "participle" ||
  pos === "pronoun" ||
  (pos === "verb" && mood !== "infinitive");

export const hasTense = (pos?: Pos) => pos === "participle" || pos === "verb";

export const hasMood = (pos?: Pos) => pos === "verb";

export const hasVoice = (pos?: Pos) => pos === "participle" || pos === "verb";

export const hasGender = (pos?: Pos) =>
  pos === "adjective" ||
  pos === "article" ||
  pos === "noun" ||
  pos === "participle" ||
  pos === "pronoun";

export const hasCase = (pos?: Pos) =>
  pos === "adjective" ||
  pos === "article" ||
  pos === "noun" ||
  pos === "participle" ||
  pos === "pronoun" ||
  pos === "preposition";

// vim: set ts=2 sw=2 et:
