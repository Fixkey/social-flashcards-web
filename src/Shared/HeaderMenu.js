import { useHistory, useLocation } from "react-router-dom";
import { Input, Menu } from "semantic-ui-react";

export function HeaderMenu(props) {
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
        <Menu.Item
          name="logout"
          active={pathname === "/logout"}
          onClick={() => history.push("/logout")}
        />
      </Menu.Menu>
    </Menu>
  );
}
