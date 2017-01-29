export class Sess {

  constructor($http, Auth, Store, Global) {
    'ngInject';
    this.$http = $http;
    this.Auth = Auth;
    this.Store = Store;
    this.Global = Global;
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
    this.Store.save('token', token);
    this.Store.save('user', user);

    // TODO it's repeated on index.config
    if (token) {
      this.$http.defaults.headers.common['x-access-token'] = token.session_id;
    }
  }

  login(user, callback) {
    localStorage.clear();
    this.saveUser(user);
    this.Auth.loadUser();
    this.Global.start();
    callback();
  }

  logout(callback) {
    localStorage.clear();
    this.Auth.loadUser();
    this.Global.start();
    callback();
  }
}
