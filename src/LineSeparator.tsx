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
  insertLine: (text: string) => void;
};

const LineSeparator = ({ insertLine }: Props) => {
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
            onClick={() => (insertLine(text), setInsertMode(false))}
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
        wrapperTagName="div"
        targetTagName="div"
        interactionKind={PopoverInteractionKind.HOVER}
        hoverOpenDelay={0}
        onOpening={() => showCaret(true)}
        onClosing={() => showCaret(false)}
      >
        <div className="line-separator">
          <Icon icon={isCaretShown ? "caret-right" : "blank"} />
          <Icon icon={isCaretShown ? "caret-left" : "blank"} />
        </div>
        <Menu>
          <MenuItem
            icon="insert"
            text="行を挿入"
            onClick={() => (setInsertMode(true), showCaret(false))}
          />
        </Menu>
      </Popover>
    );
  }
};

export default LineSeparator;

// vim: set ts=2 sw=2 et:
