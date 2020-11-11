import { useState } from "react";
import { User } from "../../models/User";

const { UserContext } = require("./UserContext");

export function UserWrapper(props) {
  const [user, setUser] = useState(User.loadUserFromLocalStorage());

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
