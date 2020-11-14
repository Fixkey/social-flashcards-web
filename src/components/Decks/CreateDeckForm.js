import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import { UserPicker } from "../Shared/UserPicker";
import { MyCheckbox, MyInput } from "../../utils/helpers";
import { createDeck } from "../../utils/apis/deckApi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export function CreateDeckForm() {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (form) => {
    setLoading(true);
    console.log(users);
    console.log(form);
    createDeck({
      name: form.name,
      privateDeck: form.private,
      owners: users,
    }).then((response) => {
      setLoading(false);
      if (response.error) {
        toast.error("Error " + response.message);
        setServerMessage(response.message);
      } else {
        toast.success("Successfully created deck: " + form.name);
        history.push("/decks/id/" + response.data.permaLink);
      }
    });
  };

  return (
    <Form
      loading={loading}
      onSubmit={handleSubmit(onSubmit)}
      error={!!serverMessage}
      className="create-form"
    >
      <MyInput
        name="name"
        label="Deck name"
        register={register}
        validation={{
          required: "Deck name is required",
          minLength: {
            value: 3,
            message: "Not less than 3 characters",
          },
        }}
        error={errors.name?.message}
      />
      <MyCheckbox name="private" label="Private deck" register={register} />
      <UserPicker users={users} setUsers={setUsers} />
      <br />
      <Button primary>Create a new deck</Button>
    </Form>
  );
}
