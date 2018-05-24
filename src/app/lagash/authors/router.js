export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/authors';

  $stateProvider.state('lagash.authors', {
    url: '/authors',
    templateUrl: base_url + '/index.html',
    controller: 'LagashAuthorsController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.authors.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
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
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.authors.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashAuthorsCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.authors.list.preview', {
    url: '/:author_id',
    templateUrl: base_url + '/update/index.html',
    controller: 'LagashAuthorsUpdateController',
    controllerAs: 'vm',
    resolve: {
      author: function($stateParams, Authors) {
        return Authors.get({
          _id: $stateParams.author_id
        }).$promise;
      },
      ejemplares: function($stateParams, Ejemplares) {
        return Ejemplares.find({
          data_id: $stateParams.author_id
        }).$promise;
      }
    }
  });
}
