import { useContext, useState } from "react";
import { Menu, Modal } from "semantic-ui-react";
import { UserContext } from "../../user/UserContext";
import { LoggedIn } from "./LoggedIn";
import { NotLoggedIn } from "./NotLoggedIn";

export function UserModal() {
  const [user] = useContext(UserContext);
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={!!open}
      trigger={
        <Menu.Item name={user.token ? user.username : "Log in"}></Menu.Item>
      }
    >
      {user.token ? (
        <LoggedIn setOpen={setOpen} />
      ) : (
        <NotLoggedIn setOpen={setOpen} />
      )}
    </Modal>
  );
}
