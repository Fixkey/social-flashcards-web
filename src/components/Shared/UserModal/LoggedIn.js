import { useContext } from "react";
import { Button, Modal } from "semantic-ui-react";
import { User } from "../../../models/User";
import { UserContext } from "../../user/UserContext";

export function LoggedIn({ setOpen }) {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <Modal.Header>Hello {user.username}</Modal.Header>
      <Modal.Content>You are logged in</Modal.Content>
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
      </Modal.Actions>
    </>
  );
}
