import React, { Component } from "react";
import { Grid, Icon, Menu } from "semantic-ui-react";
import { ProgressUpdate } from "./ProgressUpdate";

export class LoggedInContent extends Component {
  state = { activeItem: "info" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Grid>
        <Grid.Column width={2}>
          <Menu icon="labeled" vertical>
            <Menu.Item
              name="info"
              active={activeItem === "info"}
              onClick={this.handleItemClick}
            >
              <Icon name="user circle outline" />
              Basic info
            </Menu.Item>
            <Menu.Item
              name="progress"
              active={activeItem === "progress"}
              onClick={this.handleItemClick}
            >
              <Icon name="save outline" />
              Progress
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {activeItem === "info" ? (
            <div>User: {this.props.user.username}</div>
          ) : (
            <ProgressUpdate />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
