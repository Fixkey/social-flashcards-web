import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./Routes";
import { HeaderMenu } from "./Shared/HeaderMenu";
import { User } from "./user/User";
import { UserContext } from "./user/UserContext";

class App extends Component {
  constructor() {
    super();
    let user = null;
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    } else {
      user = new User();
    }
    this.state = {
      user,
    };
    // ... load config
  }

  // setToken(token) {
  //   localStorage.setItem("token", token);
  //   this.setState({ token: token });
  // }

  setToken(username, token) {
    const prevUser = this.state.user;
    const user = new User(prevUser.username, prevUser.token, prevUser.progress);
    user.token = token;
    user.username = username;
    // localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ user });
  }

  render() {
    return (
      <Router>
        <UserContext.Provider
          value={[this.state.user.token, (u, t) => this.setToken(u, t)]}
          // value={[this.state.token, (token) => this.setToken(token)]}
        >
          <HeaderMenu />
          <div className="App">
            <Routes />
          </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
