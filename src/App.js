import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Routes";
import { HeaderMenu } from "./Shared/HeaderMenu";
import { UserWrapper } from "./user/UserWrapper";

class App extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <Router>
        <UserWrapper>
          <HeaderMenu />
          <div className="App">
            <Routes />
          </div>
        </UserWrapper>
      </Router>
    );
  }
}

export default App;
