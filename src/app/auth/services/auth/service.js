export class Auth {

  constructor($log, Store) {
    'ngInject';
    this.$log = $log;
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
    this.$log.log('init!!');
  }
}
