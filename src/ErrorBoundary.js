import React from "react";
import { Button, Message } from "semantic-ui-react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error);
    console.log(info);
    // reportError(error, info); TODO
  }

  tryAgain = () => this.setState({ hasError: false });

  render() {
    return this.state.hasError ? (
      <div>
        <Message negative>
          <Message.Header>There was a problem</Message.Header>
          <Button onClick={this.tryAgain}>Try again?</Button>
        </Message>
        {/* <div role="alert">There was a problem.</div> <button>Try again?</button> */}
      </div>
    ) : (
      this.props.children
    );
  }
}
