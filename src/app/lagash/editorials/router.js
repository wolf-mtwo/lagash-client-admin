export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.editorials', {
    url: '/editorials',
    template: require('./index.html'),
    controller: 'LagashEditorialsController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.editorials.list', {
    url: '/list',
    template: require('./list/index.html'),
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
    template: require('../template/index.html')
  });

  $stateProvider.state('lagash.editorials.list.create', {
    url: '/create',
    template: require('./create/index.html'),
    controller: 'LagashEditorialsCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.editorials.list.preview', {
    url: '/:editorial_id',
    template: require('./update/index.html'),
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
