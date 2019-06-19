import * as React from "react";
import { Alignment, Classes } from "@blueprintjs/core";
import { Navbar, Button, InputGroup } from "@blueprintjs/core";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  title: string;
  onTitleChange: (value: string) => void;
};

export const AppHeader = ({ title, onTitleChange }: Props) => (
  <Navbar>
    <Navbar.Group align={Alignment.LEFT}>
      <Navbar.Heading>Barbaros</Navbar.Heading>
      <Navbar.Divider />
      <InputGroup
        leftIcon="edit"
        value={title}
        onChange={(ev: ChangeEvent) => onTitleChange(ev.target.value)}
      />
      <Navbar.Divider />
      <Button className={Classes.MINIMAL}>新規</Button>
      <Button className={Classes.MINIMAL}>開く</Button>
      <Button className={Classes.MINIMAL}>上書き保存</Button>
      <Button className={Classes.MINIMAL}>名前を付けて保存</Button>
      <Button className={Classes.MINIMAL}>ページ設定</Button>
      <Button className={Classes.MINIMAL}>印刷</Button>
      <Button className={Classes.MINIMAL}>終了</Button>
    </Navbar.Group>
    <Navbar.Group align={Alignment.RIGHT} />
  </Navbar>
);

// vim: set ts=2 sw=2 et:
