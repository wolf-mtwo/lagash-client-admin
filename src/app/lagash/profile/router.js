export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/profile';

  $stateProvider.state('lagash.profile', {
    url: '/profile',
    templateUrl: base_url + '/index.html',
    controller: 'LagashProfileController',
    controllerAs: 'vm'
  });
}
