import * as React from "react";
import {
  Popover,
  PopoverInteractionKind,
  Menu,
  MenuItem,
  Icon,
  Intent,
  Card,
  InputGroup,
  ButtonGroup,
  Button
} from "@blueprintjs/core";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  insertText: (text: string) => void;
  onLineSplit: () => void;
};

export const WordSeparator = ({ insertText, onLineSplit }: Props) => {
  const [isInsertMode, setInsertMode] = React.useState(false);
  const [text, setText] = React.useState("");
  const [isCaretShown, showCaret] = React.useState(false);

  if (isInsertMode) {
    return (
      <Card>
        <InputGroup
          value={text}
          onChange={(ev: ChangeEvent) => setText(ev.target.value)}
        />
        <ButtonGroup minimal>
          <Button
            icon="confirm"
            intent={Intent.PRIMARY}
            text="確定"
            onClick={() => (insertText(text), setInsertMode(false))}
          />
          <Button
            icon="delete"
            text="キャンセル"
            onClick={() => setInsertMode(false)}
          />
        </ButtonGroup>
      </Card>
    );
  } else {
    return (
      <Popover
        targetClassName="word-separator-target"
        interactionKind={PopoverInteractionKind.HOVER}
        hoverOpenDelay={0}
        onOpening={() => showCaret(true)}
        onClosing={() => showCaret(false)}
      >
        <div className="word-separator">
          <Icon icon={isCaretShown ? "caret-down" : "blank"} />
          <Icon icon={isCaretShown ? "caret-up" : "blank"} />
        </div>
        <Menu>
          <MenuItem
            icon="insert"
            text="単語を挿入"
            onClick={() => (setInsertMode(true), showCaret(false))}
          />
          <MenuItem icon="key-enter" text="ここで改行" onClick={onLineSplit} />
        </Menu>
      </Popover>
    );
  }
};

// vim: set ts=2 sw=2 et:
