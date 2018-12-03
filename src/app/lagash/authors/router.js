export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.authors', {
    url: '/authors',
    template: require('./index.html'),
    controller: 'LagashAuthorsController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.authors.list', {
    url: '/list',
    template: require('./list/index.html'),
    controller: 'LagashAuthorsListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Authors) {
        return Authors.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.authors.list.main', {
    url: '/main',
    template: require('../template/index.html')
  });

  $stateProvider.state('lagash.authors.list.create', {
    url: '/create',
    template: require('./create/index.html'),
    controller: 'LagashAuthorsCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.authors.list.preview', {
    url: '/:author_id',
    template: require('./update/index.html'),
    controller: 'LagashAuthorsUpdateController',
    controllerAs: 'vm',
    resolve: {
      author: function($stateParams, Authors) {
        return Authors.get({
          _id: $stateParams.author_id
        }).$promise;
      }
    }
  });
}
