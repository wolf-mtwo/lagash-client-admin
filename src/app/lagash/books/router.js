export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/books';

  $stateProvider.state('lagash.books', {
    url: '/books',
    templateUrl: base_url + '/index.html',
    controller: 'LagashBooksController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.books.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
    controller: 'LagashBooksListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Books) {
        return Books.size().$promise;
      }
    }
  });
  $stateProvider.state('lagash.books.list.main', {
    url: '/main',
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.books.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashBooksCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.books.list.preview', {
    url: '/:book_id',
    templateUrl: base_url + '/update/index.html',
    controller: 'LagashBooksUpdateController',
    controllerAs: 'vm',
    resolve: {
      book: function($stateParams, Books) {
        return Books.get({
          _id: $stateParams.book_id
        }).$promise;
      },
      ejemplares: function($stateParams, BooksEjemplares) {
        return BooksEjemplares.find({
          book_id: $stateParams.book_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('lagash.books.list.catalog', {
    url: '/:catalog_id',
    templateUrl: base_url + '/catalog/index.html',
    controller: 'LagashBooksCatalogController',
    controllerAs: 'vm',
    resolve: {
      ejemplares: function($stateParams, BooksCatalog) {
        return BooksCatalog.find({
          book_id: $stateParams.book_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('lagash.books.list.ejemplar', {
    url: '/:book_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/ejemplar/index.html',
    controller: 'LagashBooksEjemplarController',
    controllerAs: 'vm',
    resolve: {
      book: function($stateParams, Books) {
        return Books.get({
          _id: $stateParams.book_id
        }).$promise;
      },
      ejemplar: function($stateParams, BooksEjemplares) {
        return BooksEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  // TODO remove next iteraction
  // $stateProvider.state('lagash.books', {
  //   url: '/books',
  //   templateUrl: base_url + '/index.html',
  //   controller: 'LagashBooksController',
  //   controllerAs: 'vm'
  // });
  //
  // $stateProvider.state('lagash.books.list', {
  //   url: '/list',
  //   views: {
  //     'toolbar@lagash.books': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashBooksListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         // books: function(Books) {
  //         //   return Books.query().$promise;
  //         // },
  //         size: function(Books) {
  //           return Books.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.books': {
  //       templateUrl: base_url + '/../template/index.html'
  //     }
  //   }
  // });
  //
  // $stateProvider.state('lagash.books.create', {
  //   url: '/create',
  //   views: {
  //     'toolbar@lagash.books': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashBooksListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         size: function(Books) {
  //           return Books.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.books': {
  //       templateUrl: base_url + '/create/index.html',
  //       controller: 'LagashBooksCreateController',
  //       controllerAs: 'vm'
  //     }
  //   }
  // });
  //
  // $stateProvider.state('lagash.books.preview', {
  //   url: '/:book_id',
  //   views: {
  //     'toolbar@lagash.books': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashBooksListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         size: function(Books) {
  //           return Books.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.books': {
  //       templateUrl: base_url + '/update/index.html',
  //       controller: 'LagashBooksUpdateController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         book: function($stateParams, Books) {
  //           return Books.get({
  //             _id: $stateParams.book_id
  //           }).$promise;
  //         },
  //         ejemplares: function($stateParams, Ejemplares) {
  //           return Ejemplares.find({
  //             book_id: $stateParams.book_id
  //           }).$promise;
  //         }
  //       }
  //     }
  //   }
  // });
  //
  // $stateProvider.state('lagash.books.ejemplar', {
  //   url: '/:book_id/ejemplares/:ejemplar_id',
  //   views: {
  //     'toolbar@lagash.books': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashBooksListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         size: function(Books) {
  //           return Books.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.books': {
  //       templateUrl: base_url + '/ejemplar/index.html',
  //       controller: 'LagashBooksEjemplarController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         book: function($stateParams, Books) {
  //           return Books.get({
  //             _id: $stateParams.book_id
  //           }).$promise;
  //         },
  //         ejemplar: function($stateParams, Ejemplares) {
  //           return Ejemplares.get({
  //             _id: $stateParams.ejemplar_id
  //           }).$promise;
  //         }
  //       }
  //     }
  //   }
  // });
}
