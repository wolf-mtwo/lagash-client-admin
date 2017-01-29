export class Auth {

  constructor(Store) {
    'ngInject';
    this.Store = Store;
    this.subcriptors = [];
  }

  loadUser() {
    let user = this.Store.load('user');
    this.subcriptors.forEach(function(item) {
      item(user);
    });
  }

  subcrive(func) {
    this.subcriptors.push(func);
    this.loadUser();
  }

  init() {
    console.log('init!!');
  }
}
