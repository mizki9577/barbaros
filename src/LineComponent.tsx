import * as React from "react";
import { Card, EditableText } from "@blueprintjs/core";
import WordComponent from "./WordComponent";
import { Line, Word } from "./types";

const LineComponent = ({
  onLineChange,
  onWordChange,
  ...line
}: {
  onLineChange: (obj: Partial<Line>) => void;
  onWordChange: (wordIndex: number, obj: Partial<Word>) => void;
} & Line) => (
  <Card className="line">
    <div className="words">
      {line.words.map((word, i) => (
        <WordComponent
          key={i}
          onChange={word => onWordChange(i, word)}
          {...word}
        />
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
