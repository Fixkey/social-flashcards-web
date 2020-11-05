import { useContext, useState } from "react";
import { Button, Form, Menu, Modal } from "semantic-ui-react";
import { UserContext } from "../user/UserContext";
import { loginUser } from "../utils/apis";

export function UserModal() {
  const [token, setToken] = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    loginUser(name, password).then(({ username, token }) => {
      console.log(username, token);
      setToken(username, token);
    });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Menu.Item name={token ? "Logged in" : "Log in"}></Menu.Item>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Input
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
        {/* <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description> */}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
