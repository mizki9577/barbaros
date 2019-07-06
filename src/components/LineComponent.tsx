import * as React from "react";
import {
  Card,
  Button,
  ButtonGroup,
  EditableText,
  Intent
} from "@blueprintjs/core";
import { WordComponent, WordSeparator } from ".";
import { Line, Word } from "../types";

type Props = {
  onLineChange: (obj: Partial<Line>) => void;
  onWordChange: (wordIndex: number, obj: Partial<Word>) => void;
  insertText: (wordIndex: number, text: string) => void;
  onLineSplit: (wordIndex: number) => void;
  onWordDelete: (wordIndex: number) => void;
} & Line;

export const LineComponent = ({
  onLineChange,
  onWordChange,
  insertText,
  onLineSplit,
  onWordDelete,
  ...line
}: Props) => (
  <Card className="line">
    <ButtonGroup className="line-menu">
      <Button icon="eraser" intent={Intent.DANGER} text="削除" />
    </ButtonGroup>
    <div className="line-words">
      <WordSeparator
        insertText={text => insertText(0, text)}
        onLineSplit={() => onLineSplit(0)}
      />
      {line.words.map((word, i) => (
        <React.Fragment key={i}>
          <WordComponent
            onChange={word => onWordChange(i, word)}
            onDelete={() => onWordDelete(i)}
            {...word}
          />
          <WordSeparator
            insertText={text => insertText(i + 1, text)}
            onLineSplit={() => onLineSplit(i + 1)}
          />
        </React.Fragment>
      ))}
    </div>
    <div className="line-translation">
      <EditableText
        multiline
        defaultValue={line.translation}
        onConfirm={translation => onLineChange({ translation })}
      />
    </div>
  </Card>
);

// vim: set ts=2 sw=2 et:
