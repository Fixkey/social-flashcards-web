import { useContext } from "react";
import { Header, Icon } from "semantic-ui-react";
import { UserContext } from "../user/UserContext";
import { CreateDeckForm } from "./CreateDeckForm";

export function CreateDeck() {
  const [user] = useContext(UserContext);

  if (!user.token) return "Must be logged in";

  return (
    <div style={{ textAlign: "center" }}>
      <Icon.Group size="huge">
        <Icon name="folder" circular />
        <Icon corner name="add" />
      </Icon.Group>
      <Header.Content>Create a new deck</Header.Content>
      <CreateDeckForm />
    </div>
  );
}
