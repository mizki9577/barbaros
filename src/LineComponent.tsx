import * as React from "react";
import { Card, Button, ButtonGroup, EditableText } from "@blueprintjs/core";
import WordComponent from "./WordComponent";
import WordSeparator from "./WordSeparator";
import { Line, Word } from "./types";

type Props = {
  onLineChange: (obj: Partial<Line>) => void;
  onWordChange: (wordIndex: number, obj: Partial<Word>) => void;
  insertText: (wordIndex: number, text: string) => void;
} & Line;

const LineComponent = ({
  onLineChange,
  onWordChange,
  insertText,
  ...line
}: Props) => (
  <Card className="line">
    <ButtonGroup className="line-menu" minimal>
      <Button icon="eraser" text="削除" />
    </ButtonGroup>
    <div className="line-words">
      <WordSeparator insertText={text => insertText(0, text)} />
      {line.words.map((word, i) => (
        <React.Fragment key={i}>
          <WordComponent onChange={word => onWordChange(i, word)} {...word} />
          <WordSeparator insertText={text => insertText(i + 1, text)} />
        </React.Fragment>
      ))}
    </div>
    <div className="line-translation">
      <EditableText
        multiline
        value={line.translation}
        onChange={translation => onLineChange({ translation })}
      />
    </div>
  </Card>
);

export default LineComponent;

// vim: set ts=2 sw=2 et:
