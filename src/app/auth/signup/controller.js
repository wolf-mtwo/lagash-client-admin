export class SignupController {
  constructor() {
    // Users
    // Session
    // Sess
    // LocalError
    // 'ngInject';
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
  };
}
