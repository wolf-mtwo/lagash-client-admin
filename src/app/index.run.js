export function runBlock($rootScope, $state, $log) {
  'ngInject';
  $log.debug('run wolf end');

  $rootScope.$on('login-required', () => {
    $state.go('home.login');
  });
}
