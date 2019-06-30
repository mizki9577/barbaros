import * as React from "react";
import {
  lensIndex,
  lensPath,
  over,
  mergeLeft,
  insert,
  insertAll,
  splitAt,
  remove
} from "ramda";
import { Line, Word } from "../types";
import { makeWord, makeLine } from "../utils";

import { AppHeader } from ".";
import { Lines } from ".";

export type Props = {};
export type State = {
  lines: Line[];
};

export class Barbaros extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      lines: []
    };
  }

  componentDidMount() {
    const savedState = window.localStorage.getItem("barbaros");
    if (savedState) {
      this.setState(JSON.parse(savedState));
    }
  }

  componentDidUpdate() {
    window.localStorage.setItem("barbaros", JSON.stringify(this.state));
  }

  handleCreate() {
    // TODO make it more fancy
    if (!window.confirm("Really?")) return;
    this.setState({ lines: [] });
  }

  handleOpen(fileList: FileList) {
    const reader = new FileReader();
    reader.onload = () => {
      // TODO validation
      this.setState(JSON.parse(reader.result as string));
    };
    reader.readAsText(fileList[0]);
  }

  handleSave() {
    const blob = new Blob([JSON.stringify(this.state)], {
      type: "application/octet-stream"
    });
    location.href = URL.createObjectURL(blob);
  }

  handleLineChange(lineIndex: number, obj: Partial<Line>) {
    this.setState({
      lines: over(lensIndex(lineIndex), mergeLeft(obj), this.state.lines)
    });
  }

  insertText(lineIndex: number, wordIndex: number, text: string) {
    this.setState({
      lines: over(
        lensPath([lineIndex, "words"]),
        insertAll(
          wordIndex,
          text
            .trim()
            .split(/\s+/)
            .map(makeWord)
        ),
        this.state.lines
      )
    });
  }

  insertLine(lineIndex: number, text: string) {
    this.setState({
      lines: insert(
        lineIndex,
        makeLine(
          text
            .trim()
            .split(/\s+/)
            .map(makeWord)
        ),
        this.state.lines
      )
    });
  }

  handleLineSplit(lineIndex: number, wordIndex: number) {
    this.setState({
      lines: insertAll(
        lineIndex,
        splitAt(wordIndex, this.state.lines[lineIndex].words).map(makeLine),
        remove(lineIndex, 1, this.state.lines)
      )
    });
  }

  handleWordChange(lineIndex: number, wordIndex: number, obj: Partial<Word>) {
    this.setState({
      lines: over(
        lensPath([lineIndex, "words", wordIndex]),
        mergeLeft(obj),
        this.state.lines
      )
    });
  }

  render() {
    return (
      <>
        <AppHeader
          onCreate={() => this.handleCreate()}
          onOpen={fileList => this.handleOpen(fileList)}
          onSave={() => this.handleSave()}
        />
        <main>
          <Lines
            lines={this.state.lines}
            onLineChange={(lineIndex, obj) =>
              this.handleLineChange(lineIndex, obj)
            }
            onWordChange={(lineIndex, wordIndex, obj) =>
              this.handleWordChange(lineIndex, wordIndex, obj)
            }
            insertText={(lineIndex, wordIndex, text) =>
              this.insertText(lineIndex, wordIndex, text)
            }
            insertLine={(lineIndex, text) => this.insertLine(lineIndex, text)}
            onLineSplit={(lineIndex, wordIndex) =>
              this.handleLineSplit(lineIndex, wordIndex)
            }
          />
        </main>
      </>
    );
  }
}

// vim: set ts=2 sw=2 et:
