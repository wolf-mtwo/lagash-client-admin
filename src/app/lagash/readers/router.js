export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.readers', {
    url: '/readers',
    template: require('./index.html'),
    controller: 'LagashReadersController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.readers.list', {
    url: '/list',
    template: require('./list/index.html'),
    controller: 'LagashReadersListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Readers) {
        return Readers.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.readers.list.main', {
    url: '/main',
    template: require('../template/index.html')
  });

  $stateProvider.state('lagash.readers.list.create', {
    url: '/create',
    template: require('./create/index.html'),
    controller: 'LagashReadersCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.readers.list.preview', {
    url: '/:reader_id',
    template: require('./update/index.html'),
    controller: 'LagashReadersUpdateController',
    controllerAs: 'vm',
    resolve: {
      reader: function($stateParams, Readers) {
        return Readers.get({
          _id: $stateParams.reader_id
        }).$promise;
      }
    }
  });
}
