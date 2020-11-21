import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Dropdown, Form, Icon } from "semantic-ui-react";
import { UserPicker } from "../Shared/UserPicker";
import { MyCheckbox, MyInput } from "../../utils/helpers";
import { createDeck } from "../../utils/apis/deckApi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { fetchCategories, fetchSubjects } from "../../utils/apis/subjectApi";

function CategorySelect({ value, setValue, options, isFetching }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dropdown
        fluid
        selection
        search
        options={options}
        value={value}
        placeholder="Deck category (optional)"
        onChange={(e, { value }) => setValue(value)}
        // onSearchChange={this.handleSearchChange}
        disabled={isFetching}
        loading={isFetching}
      />
      <div onClick={() => setValue(null)}>
        <Icon link name="close" />
      </div>
    </div>
  );
}

function SubjectSelect({ value, setValue, options, disabled }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dropdown
        fluid
        selection
        search
        options={options}
        value={value}
        placeholder="Deck subject (optional)"
        onChange={(e, { value }) => setValue(value)}
        // onSearchChange={this.handleSearchChange}
        disabled={disabled}
      />
      <div onClick={() => setValue(null)}>
        <Icon link name="close" />
      </div>
    </div>
  );
}

export function CreateDeckForm() {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const { categoryValue, setCategoryValue, categoryOptions } = useCategory();
  const isFetching = categoryOptions === null;

  const { subjectValue, setSubjectValue, subjectOptions } = useSubject(
    categoryValue
  );
  const subjectDisabled = subjectOptions === null || categoryValue === null;

  const onSubmit = (form) => {
    setLoading(true);
    createDeck({
      name: form.name,
      privateDeck: form.private,
      owners: users,
      subjectId: subjectValue,
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
      <div className="field">
        <CategorySelect
          value={categoryValue}
          setValue={setCategoryValue}
          options={isFetching ? [] : categoryOptions}
          isFetching={isFetching}
        />
      </div>
      <div className="field">
        <SubjectSelect
          value={subjectValue}
          setValue={setSubjectValue}
          options={subjectDisabled ? [] : subjectOptions}
          disabled={subjectDisabled}
        />
      </div>
      <MyCheckbox name="private" label="Private deck" register={register} />
      <UserPicker users={users} setUsers={setUsers} />
      <br />
      <Button primary>Create a new deck</Button>
    </Form>
  );
}

function useCategory() {
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);

  useEffect(() => {
    fetchCategories().then((response) => {
      if (response.error) {
        toast.error("Error " + response.message);
      } else {
        setCategoryOptions(getCategoryOptions(response.data));
      }
    });
  }, []);

  return {
    categoryValue,
    setCategoryValue,
    categoryOptions,
  };
}

function useSubject(category) {
  const [subjectValue, setSubjectValue] = useState(null);
  const [subjectOptions, setSubjectOptions] = useState(null);

  useEffect(() => {
    setSubjectValue(null);
    setSubjectOptions(null);
    if (category) {
      fetchSubjects(category).then((response) => {
        if (response.error) {
          toast.error("Error " + response.message);
        } else {
          setSubjectOptions(getSubjectOptions(response.data));
        }
      });
    }
  }, [category]);

  return {
    subjectValue,
    setSubjectValue,
    subjectOptions,
  };
}

function getSubjectOptions(arr) {
  return arr.map((e) => ({
    key: e.id,
    text: `${e.name[0].toUpperCase()}${e.name.slice(1)}`,
    value: e.id,
  }));
}

function getCategoryOptions(arr) {
  return arr.map((e) => ({
    key: e,
    text: `${e[0].toUpperCase()}${e.slice(1)}`,
    value: e,
  }));
}
