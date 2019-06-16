import * as React from "react";
import {
  Intent,
  Card,
  InputGroup,
  ButtonGroup,
  Button,
  Popover,
  PopoverInteractionKind,
  Menu,
  MenuItem,
  Icon
} from "@blueprintjs/core";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  insertText: (text: string) => void;
};

const WordSeparator = ({ insertText }: Props) => {
  const [isCaretShown, showCaret] = React.useState(false);
  const [isInsertMode, setInsertMode] = React.useState(false);
  const [text, setText] = React.useState("");

  if (isInsertMode) {
    return (
      <Card style={{ margin: "0 1em" }}>
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
        targetTagName="div"
        targetClassName="word-separator"
        interactionKind={PopoverInteractionKind.HOVER}
        hoverOpenDelay={0}
        onOpening={() => showCaret(true)}
        onClosing={() => showCaret(false)}
        content={
          <Menu>
            <MenuItem
              icon="insert"
              text="挿入"
              onClick={() => (setInsertMode(true), showCaret(false))}
            />
            <MenuItem icon="key-enter" text="改行" />
          </Menu>
        }
      >
        <Icon
          className="word-separator-caret"
          icon={isCaretShown ? "caret-up" : "blank"}
        />
      </Popover>
    );
  }
};

export default WordSeparator;

// vim: set ts=2 sw=2 et:
