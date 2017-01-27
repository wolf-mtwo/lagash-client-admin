export class Sess {
  constructor() {

  }

  saveUser(user) {
    if (!user) {
      throw new Error('user is undefined');
    }
    if (!user.token) {
      throw new Error('token is undefined');
    }
    var token = user.token;
    // Saving on local storage
    delete user['token'];
    Store.save('token', token);
    Store.save('user', user);

    // TODO it's repeated on index.config
    if (token) {
      $http.defaults.headers.common['x-access-token'] = token.session_id;
    }
  }

  login(user, callback) {
    localStorage.clear();
    saveUser(user);
    Auth.loadUser();
    Global.start();
    callback();
  }

  logout(callback) {
    localStorage.clear();
    Auth.loadUser();
    Global.start();
    callback();
  }
}
