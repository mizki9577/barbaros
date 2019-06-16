import * as React from "react";
import {
  Popover,
  PopoverInteractionKind,
  Menu,
  MenuItem,
  Icon
} from "@blueprintjs/core";

type Props = {
  index: number;
};

const WordSeparator = ({ index }: Props) => {
  const [isCaretShown, showCaret] = React.useState(false);

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
          <MenuItem icon="insert" text="挿入" />
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
};

export default WordSeparator;

// vim: set ts=2 sw=2 et:
