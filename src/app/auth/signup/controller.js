export class SignupController {

  constructor($state, Users, Session, Sess, WError, UUID) {
    'ngInject';
    this.$state = $state;
    this.Users = Users;
    this.Session = Session;
    this.Sess = Sess;
    this.WError = WError;
    this.item = {
      _id: UUID.next(),
      name: 'wolf',
      email: 'wolf@wolf.com',
      cel: '70156988',
      password: 'wolf'
    };
  }

  register(item) {
    this.Users.save(item)
    .$promise
    .then((response) => {
      var credentials = {
        email: item.email,
        password: item.password
      };
      return this.Session.login(credentials).$promise;
    })
    .then((user) => {
      return this.Sess.login(user, () => {
        this.$state.go('lagash');
      });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
