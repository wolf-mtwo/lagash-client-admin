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
      size: function(BooksEjemplares) {
        return BooksEjemplares.size().$promise;
      },
      model: function(Books) {
        return Books;
      },
      model_ejemplar: function(BooksEjemplares) {
        return BooksEjemplares;
      },
      config: function() {
        return {route: 'lagash.books.list.preview', param: 'book_id'};
      }
    }
  });
  $stateProvider.state('lagash.inventories.thesis', {
    url: '/thesis',
    template: require('./list/index.html'),
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: function(ThesisEjemplares) {
        return ThesisEjemplares.size().$promise;
      },
      model: function(Thesis) {
        return Thesis;
      },
      model_ejemplar: function(ThesisEjemplares) {
        return ThesisEjemplares;
      },
      config: function() {
        return {route: 'lagash.thesis.list.preview', param: 'thesis_id'};
      }
    }
  });
  $stateProvider.state('lagash.inventories.magazines', {
    url: '/magazines',
    template: require('./list/index.html'),
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: function(MagazinesEjemplares) {
        return MagazinesEjemplares.size().$promise;
      },
      model: function(Magazines) {
        return Magazines;
      },
      model_ejemplar: function(MagazinesEjemplares) {
        return MagazinesEjemplares;
      },
      config: function() {
        return {route: 'lagash.magazines.list.preview', param: 'magazine_id'};
      }
    }
  });
  $stateProvider.state('lagash.inventories.newspapers', {
    url: '/newspapers',
    template: require('./list/index.html'),
    controller: 'LagashInventoriesListController',
    controllerAs: 'vm',
    resolve: {
      size: function(NewspapersEjemplares) {
        return NewspapersEjemplares.size().$promise;
      },
      model: function(Newspapers) {
        return Newspapers;
      },
      model_ejemplar: function(NewspapersEjemplares) {
        return NewspapersEjemplares;
      },
      config: function() {
        return {route: 'lagash.newspapers.list.preview', param: 'newspaper_id'};
      }
    }
  });
}

// {route: 'lagash.books.list.preview', param: 'book_id'}
// {route: 'lagash.thesis.list.preview', param: 'thesis_id'}
// {route: 'lagash.magazines.list.preview', param: 'magazine_id'}
// {route: 'lagash.newspapers.list.preview', param: 'newspaper_id'}
