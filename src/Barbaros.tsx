import * as React from "react";
import { lensIndex, lensPath, over, mergeLeft, insertAll } from "ramda";
import { Line, Word } from "./types";
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
            makeWord("Lorem"),
            makeWord("ipsum"),
            makeWord("dolor"),
            makeWord("sit"),
            makeWord("amet,"),
            makeWord("consectetur"),
            makeWord("adipisicing"),
            makeWord("elit,")
          ],
          translation: "いろはにほへと ちりぬるを"
        },
        {
          words: [
            makeWord("Εδώ"),
            makeWord("αν"),
            makeWord("κάποιο"),
            makeWord("πακέτων."),
            makeWord("Όλη"),
            makeWord("πω"),
            makeWord("κάνε"),
            makeWord("μέση"),
            makeWord("είχαμε,")
          ],
          translation: "わかよたれそ つねならむ"
        }
      ]
    };
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
              insertText={(wordIndex, text) =>
                this.insertText(i, wordIndex, text)
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
