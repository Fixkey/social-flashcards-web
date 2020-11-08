import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Form, Modal, Ref } from "semantic-ui-react";
import { User } from "../../user/User";
import { UserContext } from "../../user/UserContext";
import { loginUser } from "../../utils/apis";
import { MyInput } from "../../utils/helpers";

export function NotLoggedIn({ setOpen }) {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleLogin = () => {
    setLoading(true);
    loginUser(name, password).then(({ username, token }) => {
      setLoading(false);
      console.log(username, token);
      setUser(User.loginUser(user, username, token));
    });
  };

  return (
    <>
      <Modal.Header>Log In / Register</Modal.Header>
      <Modal.Content>
        <Form loading={loading} onSubmit={handleSubmit(onSubmit)}>
          <MyInput
            name="halo"
            label="Halo"
            register={register}
            validation={{
              required: "This is required",
            }}
            error={errors.halo?.message}
          />
          <Form.Field>
            <label htmlFor="username">Username</label>
            <input
              placeholder="Username"
              name="username"
              id="username"
              ref={register({
                required: true,
                minLength: 6,
                pattern: {
                  value: /^[A-Z0-9a-z]+$/i,
                  message: "No special characters",
                },
              })}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              name="password"
              type="password"
              id="password"
              ref={register({ required: true, minLength: 6 })}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <div className="ui checkbox">
              <input
                type="checkbox"
                ref={register}
                name="register"
                id="register"
              />
              <label htmlFor="register">Create a new account</label>
            </div>
          </Form.Field>
          <Button type="submit">Log In</Button>
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
