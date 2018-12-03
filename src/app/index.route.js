export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider.state('home', {
    url: '/',
    template: require('./home/index.html'),
    controller: 'HomeController',
    resolve: {
      //  simpleObj: function(Global) {
      //     Global.start();
      //  }
    }
  });

  $urlRouterProvider.otherwise('/');
}
