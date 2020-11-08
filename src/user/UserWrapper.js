import { useState } from "react";
import { User } from "./User";

const { UserContext } = require("./UserContext");

export function UserWrapper(props) {
  const [user, setUser] = useState(User.loadUserFromLocalStorage());

  return (
    <UserContext.Provider
      value={[user, setUser]}
      // value={[this.state.user.token, (u, t) => this.setToken(u, t)]}
    >
      {props.children}
    </UserContext.Provider>
  );
}

// constructor() {
//     super();
//     let user = null;
//     if (localStorage.getItem("user")) {
//       user = JSON.parse(localStorage.getItem("user"));
//     } else {
//       user = new User();
//     }
//     this.state = {
//       user,
//     };
//   }

//   // setToken(token) {
//   //   localStorage.setItem("token", token);
//   //   this.setState({ token: token });
//   // }

//   setToken(username, token) {
//     const prevUser = this.state.user;
//     const user = new User(prevUser.username, prevUser.token, prevUser.progress);
//     user.token = token;
//     user.username = username;
//     // localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     this.setState({ user });
//   }
