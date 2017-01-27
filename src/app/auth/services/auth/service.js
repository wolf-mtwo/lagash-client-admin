export class Auth {
  constructor() {
    var subcriptors = [];
  }

  loadUser() {
    service.user = Store.load('user');
    subcriptors.forEach(function(item) {
      item(service.user);
    });
  }

  subcrive(func) {
    subcriptors.push(func);
    this.loadUser();
  }

  init() {
    console.log('init!!');
  }
}
