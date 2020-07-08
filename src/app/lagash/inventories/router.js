export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.inventories', {
    url: '/inventories',
    template: require('./index.html'),
    controller: 'LagashInventoriesController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.inventories.books', {
    url: '/books',
    template: require('./list/index.html'),
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: (BooksEjemplares) => {
        return BooksEjemplares.size().$promise;
      },
      model: (Books) => {
        return Books;
      },
      model_ejemplar: (BooksEjemplares) => {
        return BooksEjemplares;
      },
      config: () => {
        return { route: 'lagash.books.list.preview', param: 'book_id' };
      }
    }
  });
  $stateProvider.state('lagash.inventories.thesis', {
    url: '/thesis',
    template: require('./list/index.html'),
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: (ThesisEjemplares) => {
        return ThesisEjemplares.size().$promise;
      },
      model: (Thesis) => {
        return Thesis;
      },
      model_ejemplar: (ThesisEjemplares) => {
        return ThesisEjemplares;
      },
      config: () => {
        return { route: 'lagash.thesis.list.preview', param: 'thesis_id' };
      }
    }
  });
  $stateProvider.state('lagash.inventories.magazines', {
    url: '/magazines',
    template: require('./list/index.html'),
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: (MagazinesEjemplares) => {
        return MagazinesEjemplares.size().$promise;
      },
      model: (Magazines) => {
        return Magazines;
      },
      model_ejemplar: (MagazinesEjemplares) => {
        return MagazinesEjemplares;
      },
      config: () => {
        return { route: 'lagash.magazines.list.preview', param: 'magazine_id' };
      }
    }
  });
  $stateProvider.state('lagash.inventories.newspapers', {
    url: '/newspapers',
    template: require('./list/index.html'),
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: (NewspapersEjemplares) => {
        return NewspapersEjemplares.size().$promise;
      },
      model: (Newspapers) => {
        return Newspapers;
      },
      model_ejemplar: (NewspapersEjemplares) => {
        return NewspapersEjemplares;
      },
      config: () => {
        return { route: 'lagash.newspapers.list.preview', param: 'newspaper_id' };
      }
    }
  });
}
