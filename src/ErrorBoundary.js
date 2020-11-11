import React from "react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(`%cERROR BOUNDARY`, "color: orange");
    console.log(error);
    console.log(info);
    // reportError(error, info); TODO
  }

  tryAgain = () => this.setState({ hasError: false });

  render() {
    return this.state.hasError ? (
      <div>
        <div role="alert">There was a problem.</div>{" "}
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    );
  }
}
