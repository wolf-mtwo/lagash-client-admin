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

  $stateProvider.state('lagash.books.list.catalog', {
    url: '/catalog',
    templateUrl: base_url + '/catalog/index.html',
    controller: 'LagashBooksCatalogController',
    controllerAs: 'vm',
    resolve: {
      size: function(BooksCatalog) {
        return BooksCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.books.list.catalog_preview', {
    url: '/catalog/:catalog_id',
    templateUrl: base_url + '/catalog/update/index.html',
    controller: 'LagashBooksCatalogUpdateController',
    controllerAs: 'vm',
    resolve: {
      catalog: function($stateParams, BooksCatalog) {
        return BooksCatalog.get({
          _id: $stateParams.catalog_id
        }).$promise;
      },
    }
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
          data_id: $stateParams.book_id
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

  $stateProvider.state('print_book', {
    url: '/print/book/:book_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/print/index.html',
    controller: 'LagashBooksPrintController',
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

  $stateProvider.state('print_book_chip', {
    url: '/print/chip/book/:item_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/print/chip/index.html',
    controller: 'LagashBooksPrintChipController',
    controllerAs: 'vm',
    resolve: {
      item: function($stateParams, Books) {
        return Books.get({
          _id: $stateParams.item_id
        }).$promise;
      },
      ejemplar: function($stateParams, BooksEjemplares) {
        return BooksEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });
}
