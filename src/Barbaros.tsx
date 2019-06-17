import * as React from "react";
import { lensIndex, lensPath, over, mergeLeft, insert, insertAll } from "ramda";
import { Line, Word } from "./types";
import { makeWord, makeLine } from "./utils";

import AppHeader from "./AppHeader";
import Lines from "./Lines";

export type Props = {};
export type State = {
  title: string;
  lines: Line[];
};

export default class Barbaros extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
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

  handleLineChange(lineIndex: number, obj: Partial<Line>) {
    this.setState({
      lines: over(lensIndex(lineIndex), mergeLeft(obj), this.state.lines)
    });
  }

  insertText(lineIndex: number, wordIndex: number, text: string) {
    this.setState({
      lines: over(
        lensPath([lineIndex, "words"]),
        insertAll(wordIndex, text.split(/\s+/).map(makeWord)),
        this.state.lines
      )
    });
  }

  insertLine(lineIndex: number, text: string) {
    this.setState({
      lines: insert(
        lineIndex,
        makeLine(text.split(/\s+/).map(makeWord)),
        this.state.lines
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

  handleTitleChange(title: string) {
    this.setState({ title });
  }

  render() {
    return (
      <>
        <AppHeader
          title={this.state.title}
          onTitleChange={title => this.handleTitleChange(title)}
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
          />
        </main>
      </>
    );
  }
}

// vim: set ts=2 sw=2 et:
