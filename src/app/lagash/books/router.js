export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.books', {
    url: '/books',
    template: require('./index.html'),
    controller: 'LagashBooksController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.books.list', {
    url: '/list',
    template: require('./list/index.html'),
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
    template: require('../template/index.html')
  });

  // $stateProvider.state('lagash.books.list.create', {
  //   url: '/create',
  //   template: require('./create/index.html'),
  //   controller: 'LagashBooksCreateController',
  //   controllerAs: 'vm'
  // });

  $stateProvider.state('lagash.books.list.catalog', {
    url: '/catalog',
    template: require('./catalog/index.html'),
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
    template: require('./catalog/update/index.html'),
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
    template: require('./update/index.html'),
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
    template: require('./ejemplar/index.html'),
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
    template: require('./print/index.html'),
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
    template: require('./print/chip/index.html'),
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
