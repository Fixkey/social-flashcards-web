import React, { Component } from "react";
import { toast } from "react-toastify";
import { Button, Dropdown, Grid, Header } from "semantic-ui-react";
import { fetchUsers } from "../../utils/apis/userApi";
import _ from "lodash";
// import _ from "lodash";

// const getOptions = () => [
//   {
//     key: "Carey Schmitt",
//     text: "Carey Schmitt",
//     value: "carey_schmitt",
//   },
//   {
//     key: "Carolanne Walter Sr.",
//     text: "Carolanne Walter Sr.",
//     value: "carolanne_walter_sr",
//   },
//   {
//     key: "Woodrow Zemlak",
//     text: "Woodrow Zemlak",
//     value: "woodrow_zemlak",
//   },
// ];

const getOptions = (arr) =>
  arr.map((e) => ({
    key: e,
    text: e,
    value: e,
  }));

export class UserPicker extends Component {
  state = {
    isFetching: true,
    searchQuery: null,
    value: [],
    options: [],
  };

  componentDidMount() {
    this.fetchOptions();
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
  };

  handleSearchChange = (e, { searchQuery }) => {
    this.setState({ searchQuery });
    this.fetchOptions(searchQuery);
  };

  fetchOptions = (searchQuery) => {
    this.setState({ isFetching: true });

    // API FETCH
    fetchUsers(searchQuery).then((response) => {
      if (response.error) {
        toast.error(response.message);
      } else {
        console.log(response);
        const options = getOptions(
          _.uniq([...response.data, ...this.state.value])
        );
        console.log(options);
        this.setState({
          isFetching: false,
          options,
        });
      }
    });
  };

  render() {
    const { options, isFetching, value } = this.state;

    return (
      <Dropdown
        fluid
        selection
        multiple
        search
        options={options}
        value={value}
        placeholder="Add Users"
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        disabled={isFetching}
        loading={isFetching}
      />
    );
  }
}
