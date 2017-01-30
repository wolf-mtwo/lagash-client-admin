export class LoginController {

  constructor($state, WError, Session, Sess) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Session = Session;
    this.Sess = Sess;
  }

  login(item) {
    this.Session.login(item).$promise
    .then((user) => {
      console.log(this);
      this.Sess.login(user, () => {
        console.info('starts session');
        if (user.role === 'admin') {
          this.$state.go('lagash.home');
        } else {
          throw new Error('not role asigned');
        }
      });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  };
}
