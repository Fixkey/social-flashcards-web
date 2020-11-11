import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Routes";
import { HeaderMenu } from "./components/Shared/HeaderMenu";
import { UserWrapper } from "./components/user/UserWrapper";
import { ErrorBoundary } from "./ErrorBoundary";

class App extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <Router>
        <ErrorBoundary>
          <UserWrapper>
            <HeaderMenu />
            <div className="App">
              <Routes />
            </div>
          </UserWrapper>
        </ErrorBoundary>
      </Router>
    );
  }
}

export default App;
