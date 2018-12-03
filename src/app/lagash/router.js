export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash', {
    url: '/lagash',
    template: require('./index.html'),
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
    template: require('./home/index.html'),
    controller: 'LagashHomeController',
    controllerAs:'vm'
  });
}
