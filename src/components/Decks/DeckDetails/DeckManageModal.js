import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Modal } from "semantic-ui-react";
import { changeOwnershipOfDeck } from "../../../utils/apis/deckApi";
import { UserPicker } from "../../Shared/UserPicker";

export function DeckManageModal({ deck, setDeck }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(deck.owners);
  const [privateDeck, setPrivateDeck] = useState(deck.privateDeck);

  useEffect(() => {
    setUsers(deck.owners);
  }, [deck]);

  const handleSubmit = () => {
    changeOwnershipOfDeck({
      id: deck.id,
      privateDeck,
      owners: users,
    }).then((response) => {
      if (response.error) {
        toast.error("Error " + response.message);
      } else {
        toast.success("Changes saved");
        setOpen(false);
        setDeck(response.data);
      }
    });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="grey">Manage</Button>}
    >
      <Modal.Header>Deck management</Modal.Header>
      <Modal.Content>
        <Form>
          <div className="field">
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="privateDeck"
                id="privateDeck"
                checked={privateDeck}
                onChange={() => setPrivateDeck(!privateDeck)}
              />
              <label htmlFor="privateDeck">Private deck</label>
            </div>
          </div>
          <div className="field">
            <label>Deck owners (full access)</label>
            <UserPicker users={users} setUsers={setUsers} />
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={handleSubmit}>
          Save changes
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

/* <Modal.Header>Hello {user.username}</Modal.Header>
      <Modal.Content>{<LoggedInContent user={user} />}</Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            setUser(User.logoutUser(user));
          }}
        >
          Log out
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Modal.Actions> */
