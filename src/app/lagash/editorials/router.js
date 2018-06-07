export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/editorials';

  $stateProvider.state('lagash.editorials', {
    url: '/editorials',
    templateUrl: base_url + '/index.html',
    controller: 'LagashEditorialsController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.editorials.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
    controller: 'LagashEditorialsListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Editorials) {
        return Editorials.size().$promise;
      }
    }
  });
  $stateProvider.state('lagash.editorials.list.main', {
    url: '/main',
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.editorials.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashEditorialsCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.editorials.list.preview', {
    url: '/:editorial_id',
    templateUrl: base_url + '/update/index.html',
    controller: 'LagashEditorialsUpdateController',
    controllerAs: 'vm',
    resolve: {
      editorial: function($stateParams, Editorials) {
        return Editorials.get({
          _id: $stateParams.editorial_id
        }).$promise;
      }
    }
  });
}
