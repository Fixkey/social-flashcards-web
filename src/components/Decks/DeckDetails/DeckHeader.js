import { useRef, useState } from "react";
import { Button, Confirm, Header, Icon, Input, Modal } from "semantic-ui-react";

export function DeckHeader({
  name,
  removeDeck,
  reviewDeck,
  readOnly,
  shareLink,
  privateDeck,
}) {
  const {
    deleteOpen,
    setDeleteOpen,
    deleteDeck,
    shareDeckOpen,
    setShareDeckOpen,
  } = useHooks(removeDeck);
  const copyText = useRef();

  return (
    <>
      <Header as="h3" icon textAlign="center">
        {/* <Icon name="folder" circular /> */}
        <Icon.Group>
          <Icon circular name="folder" />
          {privateDeck && <Icon className="lock-icon" corner name="lock" />}
        </Icon.Group>
        <Header.Content>{name}</Header.Content>
      </Header>
      <div style={{ textAlign: "center" }}>
        {!readOnly && (
          <>
            <Button color="red" onClick={() => setDeleteOpen(true)}>
              Delete Deck
            </Button>
            <Confirm
              open={deleteOpen}
              content={"Are you sure you want to delete deck '" + name + "'?"}
              onCancel={() => deleteDeck(false)}
              onConfirm={() => deleteDeck(true)}
            />
          </>
        )}
        <Button color="green" onClick={reviewDeck}>
          Review Deck
        </Button>
        {/* <Button color="blue" onClick={ }>Share Deck</Button> */}
        <Modal
          onClose={() => setShareDeckOpen(false)}
          onOpen={() => setShareDeckOpen(true)}
          open={!!shareDeckOpen}
          trigger={<Button color="blue">Share Deck</Button>}
        >
          <Modal.Content>
            <Input
              action={{
                color: "teal",
                labelPosition: "right",
                icon: "copy",
                content: "Copy",
                onClick: () => {
                  const { current } = copyText.current.inputRef;
                  current.select();
                  document.execCommand("copy");
                },
              }}
              fluid
              value={shareLink}
              ref={copyText}
            />
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
}

function useHooks(removeDeck) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareDeckOpen, setShareDeckOpen] = useState(false);

  const deleteDeck = (del) => {
    if (!del) {
      setDeleteOpen(false);
    } else {
      removeDeck();
    }
  };

  return {
    deleteOpen,
    setDeleteOpen,
    deleteDeck,
    shareDeckOpen,
    setShareDeckOpen,
  };
}
