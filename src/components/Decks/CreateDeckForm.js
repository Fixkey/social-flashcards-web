import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";
import { UserPicker } from "../Shared/UserPicker";
import { MyCheckbox, MyInput } from "../../utils/helpers";

export function CreateDeckForm() {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (form) => {};

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
      <UserPicker />
    </Form>
  );
}
