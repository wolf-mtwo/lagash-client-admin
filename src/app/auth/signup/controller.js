export class SignupController {

  constructor($state, Users, Session, Sess, WError) {
    'ngInject';
    this.$state = $state;
    this.Users = Users;
    this.Session = Session;
    this.Sess = Sess;
    this.WError = WError;
    this.item = {
      name: 'wolf',
      email: 'wolf@wolf.com',
      cel: '70156988',
      password: 'wolf'
    };
  }

  register(item) {
    item.role = "admin";
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
        if (user.role === 'admin') {
          this.$state.go('lagash');
        } else {
          throw new Error('not role asigned');
        }
      });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
