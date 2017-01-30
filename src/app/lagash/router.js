export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash';

  $stateProvider.state('lagash', {
    url: '/lagash',
    templateUrl: base_url + '/index.html',
    controller: 'LagashController',
    controllerAs:'vm'
  });
}
