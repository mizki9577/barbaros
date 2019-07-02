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
import { Word as WordType } from "../types";
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
  onChange: (obj: Partial<WordType>) => void;
  onDelete: () => void;
} & WordType;

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
        <WordMenu shown={isMenuShown} onDelete={onDelete} />
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
        intent={
          word.translation === undefined || word.translation.length <= 0
            ? Intent.DANGER
            : Intent.NONE
        }
        onChange={translation => onChange({ translation })}
      />
    </div>
  );
};

const WordMenu = ({
  shown,
  onDelete
}: {
  shown: boolean;
  onDelete: () => void;
}) => (
  <Popover className="word-menu">
    <Button icon={shown ? "more" : "blank"} minimal />
    <Menu>
      <MenuItem
        icon="eraser"
        intent={Intent.DANGER}
        text="削除"
        onClick={onDelete}
      />
    </Menu>
  </Popover>
);

const WordAttributes = ({
  onChange,
  ...word
}: WordType & { onChange: (obj: Partial<WordType>) => void }) => (
  <div>
    <selectors.PosSelector
      value={word.pos}
      onChange={pos => onChange({ pos })}
    />
    <selectors.PersonSelector
      value={word.person}
      shown={hasPerson(word.pos, word.mood)}
      onChange={person => onChange({ person })}
    />
    <selectors.NumberSelector
      value={word.number_}
      shown={hasNumber(word.pos, word.mood)}
      onChange={number_ => onChange({ number_ })}
    />
    <selectors.TenseSelector
      value={word.tense}
      shown={hasTense(word.pos)}
      onChange={tense => onChange({ tense })}
    />
    <selectors.MoodSelector
      value={word.mood}
      shown={hasMood(word.pos)}
      onChange={mood => onChange({ mood })}
    />
    <selectors.VoiceSelector
      value={word.voice}
      shown={hasVoice(word.pos)}
      onChange={voice => onChange({ voice })}
    />
    <selectors.GenderSelector
      value={word.gender}
      shown={hasGender(word.pos)}
      onChange={gender => onChange({ gender })}
    />
    <selectors.CaseSelector
      value={word.case_}
      shown={hasCase(word.pos)}
      onChange={case_ => onChange({ case_ })}
    />
  </div>
);

// vim: set ts=2 sw=2 et:
