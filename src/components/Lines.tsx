import * as React from "react";
import {
  NonIdealState,
  TextArea,
  Button,
  ButtonGroup,
  Intent
} from "@blueprintjs/core";
import { LineComponent, LineSeparator } from ".";
import { Line, Word } from "../types";

type Props = {
  lines: Line[];
  onLineChange: (lineIndex: number, obj: Partial<Line>) => void;
  onWordChange: (
    lineIndex: number,
    wordIndex: number,
    obj: Partial<Word>
  ) => void;
  insertLine: (lineIndex: number, text: string) => void;
  insertText: (lineIndex: number, wordIndex: number, text: string) => void;
  onLineSplit: (lineIndex: number, wordIndex: number) => void;
  onWordDelete: (lineIndex: number, wordIndex: number) => void;
};

export const Lines = ({
  lines,
  onLineChange,
  onWordChange,
  insertLine,
  insertText,
  onLineSplit,
  onWordDelete
}: Props) => {
  if (lines.length === 0) {
    return <Initial onConfirm={text => insertLine(0, text)} />;
  } else {
    return (
      <>
        <LineSeparator insertLine={text => insertLine(0, text)} />
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            <LineComponent
              onLineChange={obj => onLineChange(i, obj)}
              onWordChange={(wordIndex, obj) => onWordChange(i, wordIndex, obj)}
              insertText={(wordIndex, text) => insertText(i, wordIndex, text)}
              onLineSplit={wordIndex => onLineSplit(i, wordIndex)}
              onWordDelete={wordIndex => onWordDelete(i, wordIndex)}
              {...line}
            />
            <LineSeparator insertLine={text => insertLine(i + 1, text)} />
          </React.Fragment>
        ))}
      </>
    );
  }
};

const Initial = ({ onConfirm }: { onConfirm: (text: string) => void }) => {
  const [text, setText] = React.useState("");
  return (
    <NonIdealState
      title="何もありません"
      description="テキストを入力してみましょう"
      icon="edit"
      action={
        <>
          <TextArea
            growVertically
            large
            value={text}
            onChange={ev => setText(ev.target.value)}
          />
          <ButtonGroup>
            <Button
              intent={Intent.PRIMARY}
              text="確定"
              onClick={() => onConfirm(text)}
            />
          </ButtonGroup>
        </>
      }
    />
  );
};

// vim: set ts=2 sw=2 et:
