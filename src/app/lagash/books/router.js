export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/books';

  $stateProvider.state('lagash.books', {
    url: '/books',
    templateUrl: base_url + '/index.html',
    controller: 'LagashBooksController',
    controllerAs:'vm'
  });

  $stateProvider.state('lagash.books.list', {
    url: '/list',
    views: {
      'toolbar@lagash.books': {
        templateUrl: base_url + '/list/index.html',
        controller: 'LagashBooksListController',
        controllerAs:'vm',
        resolve: {
          books: function(Books) {
            return Books.query().$promise
            .then((response) => {
              return response;
            });
          }
        }
      },
      'container@lagash.books': {
        templateUrl: base_url + '/../template/index.html'
      }
    }
  });

  $stateProvider.state('lagash.books.create', {
    url: '/create',
    views: {
      'toolbar@lagash.books': {
        templateUrl: base_url + '/list/index.html',
        controller: 'LagashBooksListController',
        controllerAs:'vm',
        resolve: {
          books: function(Books) {
            return Books.query().$promise
            .then((response) => {
              return response;
            });
          }
        }
      },
      'container@lagash.books': {
        templateUrl: base_url + '/create/index.html',
        controller: 'LagashBooksCreateController',
        controllerAs:'vm'
      }
    }
  });

  $stateProvider.state('lagash.books.preview', {
    url: '/:book_id',
    views: {
      'toolbar@lagash.books': {
        templateUrl: base_url + '/list/index.html',
        controller: 'LagashBooksListController',
        controllerAs:'vm',
        resolve: {
          books: function(Books) {
            return Books.query().$promise
            .then((response) => {
              return response;
            });
          }
        }
      },
      'container@lagash.books': {
        templateUrl: base_url + '/update/index.html',
        controller: 'LagashBooksUpdateController',
        controllerAs:'vm',
        resolve: {
          book: function($stateParams, Books) {
            return Books.get({
              _id: $stateParams.book_id
            }).$promise
            .then((response) => {
              return response;
            });
          },
          replicas: function($stateParams, Replicas) {
            return Replicas.query({
              book_id: $stateParams.book_id
            }).$promise
            .then((response) => {
              return response;
            });
          }
        }
      }
    }
  });

  $stateProvider.state('lagash.books.replica', {
    url: '/:book_id/replicas/:replica_id',
    views: {
      'toolbar@lagash.books': {
        templateUrl: base_url + '/list/index.html',
        controller: 'LagashBooksListController',
        controllerAs:'vm',
        resolve: {
          books: function(Books) {
            return Books.query().$promise
            .then((response) => {
              return response;
            });
          }
        }
      },
      'container@lagash.books': {
        templateUrl: base_url + '/replica/index.html',
        controller: 'LagashBooksReplicaController',
        controllerAs:'vm',
        resolve: {
          book: function($stateParams, Books) {
            return Books.get({
              _id: $stateParams.book_id
            }).$promise
            .then((response) => {
              return response;
            });
          },
          replica: function($stateParams, Replicas) {
            return Replicas.get({
              _id: $stateParams.replica_id
            }).$promise
            .then((response) => {
              return response;
            });
          }
        }
      }
    }
  });
}
