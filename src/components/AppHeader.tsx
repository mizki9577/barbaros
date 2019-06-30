import * as React from "react";
import { Alignment } from "@blueprintjs/core";
import { Navbar, Button, FileInput, Dialog } from "@blueprintjs/core";

type Props = {
  onCreate: () => void;
  onOpen: (fileFist: FileList) => void;
  onSave: () => void;
};

export const AppHeader = ({ onCreate, onOpen, onSave }: Props) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Barbaros</Navbar.Heading>
          <Button minimal onClick={onCreate}>
            新規
          </Button>
          <Button minimal onClick={() => setDialogOpen(true)}>
            開く
          </Button>
          <Button minimal onClick={onSave}>
            保存
          </Button>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} />
      </Navbar>
      <Navbar.Divider />
      <Dialog
        isOpen={isDialogOpen}
        title="開く"
        onClose={() => setDialogOpen(false)}
      >
        <FileInput
          onInputChange={ev => {
            const files = ev.currentTarget.files;
            if (files === null) return;
            onOpen(files);
            setDialogOpen(false);
          }}
        />
      </Dialog>
    </>
  );
};

// vim: set ts=2 sw=2 et:
