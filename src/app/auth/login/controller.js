export class LoginController {

  constructor($state, $log, WError, Session, Sess) {
    'ngInject';
    this.$state = $state;
    this.$log = $log;
    this.WError = WError;
    this.Session = Session;
    this.Sess = Sess;
  }

  login(item) {
    this.Session.login(item).$promise
    .then((user) => {
      this.Sess.login(user, () => {
        this.$log.info('starts session');
        this.$state.go('lagash.home');
      });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  };
}
