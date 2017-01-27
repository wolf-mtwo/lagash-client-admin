export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/auth';

  $stateProvider.state('home.sign', {
    url: 'sign',
    templateUrl: base_url + '/sign/index.html',
    controller: 'SessionRegisterController'
  });

  $stateProvider.state('home.login', {
    url: 'login',
    templateUrl: base_url + '/login/index.html',
    controller: 'SessionLoginController'
  });

  $stateProvider.state('home.forgot', {
    url: 'forgot',
    templateUrl: base_url + 'forgot.html',
    controller: 'SessionsController'
  });
}
