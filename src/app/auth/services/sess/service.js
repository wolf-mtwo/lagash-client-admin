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
    this.Store.save('token', token.session_id, 1);
    this.Store.save('user', user);

    // TODO it's repeated on index.config
    if (token) {
     // this.$http.defaults.headers.common['x-access-token'] = token.session_id;
     this.$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; 
     this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token.session_id;
      

     // ('Access-Control-Allow-Origin', '*');
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
