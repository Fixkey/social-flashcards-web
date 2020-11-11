export class User {
  constructor(username, token, progress = {}) {
    this.username = username;
    this.token = token;
    this.progress = progress;
  }

  static cloneUser(user) {
    return new User(user.username, user.token, user.progress);
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
    return localStorage.getItem("user");
  }

  static save(user) {
    return localStorage.setItem("user", JSON.stringify(user));
  }

  static updateProgress(user, deckPermaLink, progress) {
    const newUser = this.cloneUser(user);
    newUser.progress[deckPermaLink] = progress;
    return newUser;
  }

  static replaceProgress(user, progress) {
    const newUser = this.cloneUser(user);
    newUser.progress = progress;
    this.save(newUser);
    return newUser;
  }
}
