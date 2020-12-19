import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Message, Modal } from "semantic-ui-react";
import { User } from "../../../models/User";
import { UserContext } from "../../user/UserContext";
import { loginUser, registerUser } from "../../../utils/apis/userApi";
import { MyCheckbox, MyInput } from "../../../utils/helpers";

export function NotLoggedIn({ setOpen }) {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (form) => {
    setServerMessage(null);
    setLoading(true);
    if (form.register) {
      registerUser(form.username, form.password).then((json) => {
        if (json.error) {
          setLoading(false);
          setServerMessage(json.message);
        } else {
          onSubmit({ ...form, register: false });
        }
      });
    } else {
      loginUser(form.username, form.password).then((json) => {
        setLoading(false);
        if (json.error) {
          setServerMessage(json.message);
        } else {
          const { username, token } = json.data;
          setUser(User.loginUser(user, username, token));
        }
      });
    }
  };

  return (
    <>
      <Modal.Header>Log In / Register</Modal.Header>
      <Modal.Content>
        <p>Login to create and manage decks, save progress in the cloud.</p>
        <Form
          loading={loading}
          onSubmit={handleSubmit(onSubmit)}
          error={!!serverMessage}
        >
          <MyInput
            name="username"
            label="Username"
            register={register}
            validation={{
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Not less than 6 characters",
              },
              pattern: {
                value: /^[A-Z0-9a-z]+$/i,
                message: "No special characters",
              },
            }}
            error={errors.username?.message}
          />
          <MyInput
            name="password"
            label="Password"
            type="password"
            register={register}
            validation={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Not less than 6 characters",
              },
            }}
            error={errors.password?.message}
          />
          <MyCheckbox
            name="register"
            label="Create a new account"
            register={register}
          />
          {serverMessage && (
            <Message error header="Action Forbidden" content={serverMessage} />
          )}
          <Button type="submit">Log In / Register</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </>
  );
}
