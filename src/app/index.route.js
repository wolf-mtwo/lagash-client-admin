export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'app/home/index.html',
    controller: 'HomeController',
    resolve: {
      //  simpleObj: function(Global) {
      //     Global.start();
      //  }
    }
  });

  $urlRouterProvider.otherwise('/');
}
