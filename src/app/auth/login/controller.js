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
      this.Sess.login(user, () => {
        console.info('starts session');
        this.$state.go('lagash.home');
      });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  };
}
