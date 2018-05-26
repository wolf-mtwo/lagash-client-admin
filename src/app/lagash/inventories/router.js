export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/inventories';

  $stateProvider.state('lagash.inventories', {
    url: '/inventories',
    templateUrl: base_url + '/index.html',
    controller: 'LagashInventoriesController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.inventories.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Ejemplares) {
        return Ejemplares.size().$promise;
      }
    }
  });
}
