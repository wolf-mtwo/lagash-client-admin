export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/auth';

  $stateProvider.state('home.signup', {
    url: 'signup',
    templateUrl: base_url + '/signup/index.html',
    controller: 'SignupController'
  });

  $stateProvider.state('home.login', {
    url: 'login',
    templateUrl: base_url + '/login/index.html',
    controller: 'LoginController'
  });

  $stateProvider.state('home.forgot', {
    url: 'forgot',
    templateUrl: base_url + '/forgot/index.html',
    controller: 'ForgotController'
  });
}