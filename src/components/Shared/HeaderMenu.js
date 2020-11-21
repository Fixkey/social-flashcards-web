import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { UserContext } from "../user/UserContext";
import { UserModal } from "./UserModal/UserModal";

export function HeaderMenu() {
  const { pathname } = useLocation();
  const [user] = useContext(UserContext);
  const loggedIn = !!user.token;
  const history = useHistory();

  return (
    <Menu>
      <Menu.Item
        name="home"
        active={pathname === "/"}
        onClick={() => history.push("/")}
      />
      <Menu.Item
        name="categories"
        active={pathname === "/categories"}
        onClick={() => history.push("/categories")}
      />
      <Menu.Item
        name="all decks"
        active={pathname === "/decks"}
        onClick={() => history.push("/decks")}
      />
      {loggedIn && (
        <Menu.Item
          name="create deck"
          active={pathname === "/decks/create"}
          onClick={() => history.push("/decks/create")}
        />
      )}
      <Menu.Menu position="right">
        {/* <Menu.Item>
          <Input
            icon="search"
            placeholder="Search..."
          />
        </Menu.Item> */}
        <UserModal />
      </Menu.Menu>
    </Menu>
  );
}
