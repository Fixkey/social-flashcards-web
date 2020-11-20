import React, { Component } from "react";
import { toast } from "react-toastify";
import { Dropdown } from "semantic-ui-react";
import { fetchUsers } from "../../utils/apis/userApi";
import _ from "lodash";

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
    // value: [],
    options: [],
  };

  componentDidMount() {
    this.fetchOptions();
  }

  handleChange = (e, { value }) => {
    // this.setState({ value });
    this.props.setUsers(value);
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
        const options = getOptions(
          _.uniq([...response.data, ...this.props.users])
          // _.uniq([...response.data, ...this.state.value])
        );
        this.setState({
          isFetching: false,
          options,
        });
      }
    });
  };

  render() {
    // const { options, isFetching, value } = this.state;
    const { options, isFetching } = this.state;

    return (
      <Dropdown
        fluid
        selection
        multiple
        search
        options={options}
        value={this.props.users}
        // value={value}
        placeholder="Add Users"
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        disabled={isFetching}
        loading={isFetching}
      />
    );
  }
}
