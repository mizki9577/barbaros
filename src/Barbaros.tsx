import * as React from "react";
import { lensIndex, lensPath, over, mergeLeft } from "ramda";
import { Line, Word, Pos } from "./types";
import { makeWord } from "./utils";

import AppHeader from "./AppHeader";
import LineComponent from "./LineComponent";

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
      title: "The Lipsum",
      lines: [
        {
          words: [
            makeWord("lorem"),
            makeWord("ipsum"),
            makeWord("dolor"),
            makeWord("sit"),
            makeWord("amet")
          ],
          translation: "いろはにほへと ちりぬるを"
        }
      ]
    };
  }

  handleLineChange(lineIndex: number, obj: Partial<Line>) {
    this.setState({
      lines: over(lensIndex(lineIndex), mergeLeft(obj), this.state.lines)
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
          {this.state.lines.map((line, i) => (
            <LineComponent
              key={i}
              onLineChange={obj => this.handleLineChange(i, obj)}
              onWordChange={(wordIndex, obj) =>
                this.handleWordChange(i, wordIndex, obj)
              }
              {...line}
            />
          ))}
        </main>
      </>
    );
  }
}

// vim: set ts=2 sw=2 et:
