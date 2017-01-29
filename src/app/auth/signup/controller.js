export class SignupController {

  constructor(Users, Session, Sess, WError) {
    'ngInject';
    this.item = {
      name: 'wolf',
      email: 'wolf@wolf.com',
      cel: '70156988',
      password: 'wolf'
    };
  }

  register(item) {
    item.role = "admin";
    Users.save(item, function() {
      var sessionCredentiales = {
        email: item.email,
        password: item.password
      };
      Session.login(sessionCredentiales, function(user) {
        Sess.login(user, function() {
          if (user.role === 'admin') {
            $state.go('lagash');
          } else {
            throw new Error('not role asigned');
          }
        });
      });
    }, LocalError.request);
  }
}
