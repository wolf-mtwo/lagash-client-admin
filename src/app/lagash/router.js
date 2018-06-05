export function router($stateProvider) {
  'ngInject';
  var base_url = './app/lagash';

  $stateProvider.state('lagash', {
    url: '/lagash',
    templateUrl: base_url + '/index.html',
    controller: 'LagashController',
    controllerAs:'vm',
    resolve: {
       simpleObj: function(Global) {
          Global.start();
       }
    }
  });

  $stateProvider.state('lagash.home', {
    url: '/home',
    templateUrl: base_url + '/home/index.html',
    controller: 'LagashHomeController',
    controllerAs:'vm'
  });
}
