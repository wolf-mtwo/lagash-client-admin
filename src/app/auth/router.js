export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('home.signup', {
    url: 'signup',
    template: require('./signup/index.html'),
    controller: 'SignupController',
    controllerAs:'vm'
  });

  $stateProvider.state('home.login', {
    url: 'login',
    template: require('./login/index.html'),
    controller: 'LoginController',
    controllerAs:'vm'
  });

  $stateProvider.state('home.forgot', {
    url: 'forgot',
    template: require('./forgot/index.html'),
    controller: 'ForgotController',
    controllerAs:'vm'
  });
}
