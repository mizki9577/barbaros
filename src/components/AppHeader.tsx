import * as React from "react";
import { Alignment } from "@blueprintjs/core";
import { Navbar, Button } from "@blueprintjs/core";

type Props = {
  onCreate: () => void;
  onOpen: (fileFist: FileList) => void;
  downloadUrl: string;
};

export const AppHeader = ({ onCreate, onOpen, downloadUrl }: Props) => {
  const fileInput = React.createRef<HTMLInputElement>();
  const downloadLink = React.createRef<HTMLAnchorElement>();

  return (
    <>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Barbaros</Navbar.Heading>
          <Button minimal onClick={onCreate}>
            新規
          </Button>
          <Button
            minimal
            onClick={() => fileInput.current && fileInput.current.click()}
          >
            開く
          </Button>
          <Button
            minimal
            onClick={() => downloadLink.current && downloadLink.current.click()}
          >
            保存
          </Button>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} />
      </Navbar>
      <Navbar.Divider />
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={ev =>
          ev.currentTarget.files && onOpen(ev.currentTarget.files)
        }
      />
      <a
        href={downloadUrl}
        download="barbaros.json"
        style={{ display: "none" }}
        ref={downloadLink}
      ></a>
    </>
  );
};

// vim: set ts=2 sw=2 et:
