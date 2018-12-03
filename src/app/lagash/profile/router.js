export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.profile', {
    url: '/profile',
    template: require('./index.html'),
    controller: 'LagashProfileController',
    controllerAs: 'vm'
  });
}
