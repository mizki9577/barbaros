import * as React from "react";
import {
  Intent,
  EditableText,
  Popover,
  Button,
  Menu,
  MenuItem
} from "@blueprintjs/core";
import * as selectors from "./selectors";
import { Word } from "../types";
import {
  hasPerson,
  hasNumber,
  hasTense,
  hasMood,
  hasVoice,
  hasGender,
  hasCase
} from "../utils";

type Props = {
  onChange: (obj: Partial<Word>) => void;
  onDelete: () => void;
} & Word;

export const WordComponent = ({ onChange, onDelete, ...word }: Props) => {
  const [isMenuShown, showMenu] = React.useState(false);
  return (
    <div
      className="word"
      onMouseEnter={() => showMenu(true)}
      onMouseLeave={() => showMenu(false)}
    >
      <div className="word-firstrow">
        <div>
          <span>&lt;&nbsp;</span>
          <EditableText
            className="word-lemma"
            value={word.lemma}
            onChange={lemma => onChange({ lemma })}
          />
        </div>
        <WordMenu shown={isMenuShown} />
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
};

const WordMenu = ({ shown }: { shown: boolean }) => (
  <Popover className="word-menu">
    <Button icon={shown ? "more" : "blank"} minimal />
    <Menu>
      <MenuItem icon="eraser" intent={Intent.DANGER} text="削除" />
    </Menu>
  </Popover>
);

const WordAttributes = ({
  onChange,
  ...word
}: Word & { onChange: (obj: Partial<Word>) => void }) => (
  <div>
    <selectors.PosSelector
      value={word.pos}
      selectProps={{ minimal: true }}
      onChange={pos => onChange({ pos })}
    />
    <selectors.PersonSelector
      value={word.person}
      shown={hasPerson(word.pos, word.mood)}
      selectProps={{ minimal: true }}
      onChange={person => onChange({ person })}
    />
    <selectors.NumberSelector
      value={word.number_}
      shown={hasNumber(word.pos, word.mood)}
      selectProps={{ minimal: true }}
      onChange={number_ => onChange({ number_ })}
    />
    <selectors.TenseSelector
      value={word.tense}
      shown={hasTense(word.pos)}
      selectProps={{ minimal: true }}
      onChange={tense => onChange({ tense })}
    />
    <selectors.MoodSelector
      value={word.mood}
      shown={hasMood(word.pos)}
      selectProps={{ minimal: true }}
      onChange={mood => onChange({ mood })}
    />
    <selectors.VoiceSelector
      value={word.voice}
      shown={hasVoice(word.pos)}
      selectProps={{ minimal: true }}
      onChange={voice => onChange({ voice })}
    />
    <selectors.GenderSelector
      value={word.gender}
      shown={hasGender(word.pos)}
      selectProps={{ minimal: true }}
      onChange={gender => onChange({ gender })}
    />
    <selectors.CaseSelector
      value={word.case_}
      shown={hasCase(word.pos)}
      selectProps={{ minimal: true }}
      onChange={case_ => onChange({ case_ })}
    />
  </div>
);

// vim: set ts=2 sw=2 et:
