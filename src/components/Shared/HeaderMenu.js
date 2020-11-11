import { useHistory, useLocation } from "react-router-dom";
import { Input, Menu } from "semantic-ui-react";
import { UserModal } from "./UserModal/UserModal";

export function HeaderMenu() {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <Menu>
      <Menu.Item
        name="home"
        active={pathname === "/"}
        onClick={() => history.push("/")}
      />
      <Menu.Item
        name="subjects"
        active={pathname === "/subjects"}
        onClick={() => history.push("/subjects")}
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
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <UserModal />
      </Menu.Menu>
    </Menu>
  );
}
