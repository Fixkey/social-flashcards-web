export class User {
  static localStorageKey = "user";

  constructor(username, token, progress) {
    this.username = username;
    this.token = token;
    this.progress = progress;
  }

  static loadUserFromLocalStorage() {
    const user = User.load();
    if (user) {
      const userObj = JSON.parse(user);
      return new User(userObj.username, userObj.token, userObj.progress);
    }
    return new User();
  }

  static loginUser(prevUser, username, token) {
    const user = new User(username, token, prevUser.progress);
    User.save(user);
    return user;
  }

  static logoutUser(prevUser) {
    const user = new User(null, null, prevUser.progress);
    User.save(user);
    return user;
  }

  static load() {
    localStorage.getItem(User.localStorageKey);
  }

  static save(user) {
    localStorage.setItem(User.localStorageKey, JSON.stringify(user));
  }
}
