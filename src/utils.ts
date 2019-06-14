import { Word, Pos, Mood } from "./types";

export const makeWord = (text: string): Word => ({
  text
});

export const hasPerson = (pos?: Pos, mood?: Mood) => {
  return pos === "verb" && mood !== "infinitive";
};

export const hasNumber = (pos?: Pos, mood?: Mood) => {
  switch (pos) {
    case "adjective":
    case "article":
    case "noun":
    case "participle":
    case "pronoun":
      return true;
    case "verb":
      return mood !== "infinitive";
  }
  return false;
};

export const hasTense = (pos?: Pos) => {
  switch (pos) {
    case "participle":
    case "verb":
      return true;
  }
  return false;
};

export const hasMood = (pos?: Pos) => {
  return pos === "verb";
};

export const hasVoice = (pos?: Pos) => {
  switch (pos) {
    case "participle":
    case "verb":
      return true;
  }
  return false;
};

export const hasGender = (pos?: Pos) => {
  switch (pos) {
    case "adjective":
    case "article":
    case "noun":
    case "participle":
    case "pronoun":
      return true;
  }
  return false;
};

export const hasCase = (pos?: Pos) => {
  switch (pos) {
    case "adjective":
    case "article":
    case "noun":
    case "participle":
    case "pronoun":
    case "preposition":
      return true;
  }
  return false;
};

// vim: set ts=2 sw=2 et:
