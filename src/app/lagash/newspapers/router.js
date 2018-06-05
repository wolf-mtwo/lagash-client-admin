export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/newspapers';

  $stateProvider.state('lagash.newspapers', {
    url: '/newspapers',
    templateUrl: base_url + '/index.html',
    controller: 'LagashNewspapersController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.newspapers.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
    controller: 'LagashNewspapersListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Newspapers) {
        return Newspapers.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.newspapers.list.main', {
    url: '/main',
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.newspapers.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashNewspapersCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.newspapers.list.catalog', {
    url: '/catalog',
    templateUrl: base_url + '/catalog/index.html',
    controller: 'LagashNewspapersCatalogController',
    controllerAs: 'vm',
    resolve: {
      size: function(NewspapersCatalog) {
        return NewspapersCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.newspapers.list.catalog_preview', {
    url: '/catalog/:catalog_id',
    templateUrl: base_url + '/catalog/update/index.html',
    controller: 'LagashNewspapersCatalogUpdateController',
    controllerAs: 'vm',
    resolve: {
      catalog: function($stateParams, NewspapersCatalog) {
        return NewspapersCatalog.get({
          _id: $stateParams.catalog_id
        }).$promise;
      },
    }
  });

  $stateProvider.state('lagash.newspapers.list.preview', {
    url: '/:newspaper_id',
    templateUrl: base_url + '/update/index.html',
    controller: 'LagashNewspapersUpdateController',
    controllerAs: 'vm',
    resolve: {
      newspaper: function($stateParams, Newspapers) {
        return Newspapers.get({
          _id: $stateParams.newspaper_id
        }).$promise;
      },
      ejemplares: function($stateParams, NewspapersEjemplares) {
        return NewspapersEjemplares.find({
          data_id: $stateParams.newspaper_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('lagash.newspapers.list.ejemplar', {
    url: '/:newspaper_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/ejemplar/index.html',
    controller: 'LagashNewspapersEjemplarController',
    controllerAs: 'vm',
    resolve: {
      newspaper: function($stateParams, Newspapers) {
        return Newspapers.get({
          _id: $stateParams.newspaper_id
        }).$promise;
      },
      ejemplar: function($stateParams, NewspapersEjemplares) {
        return NewspapersEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_newspaper', {
    url: '/print/newspaper/:newspaper_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/print/index.html',
    controller: 'LagashNewspapersPrintController',
    controllerAs: 'vm',
    resolve: {
      newspaper: function($stateParams, Newspapers) {
        return Newspapers.get({
          _id: $stateParams.newspaper_id
        }).$promise;
      },
      ejemplar: function($stateParams, NewspapersEjemplares) {
        return NewspapersEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_newspaper_chip', {
    url: '/print/chip/newspapers/:item_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/print/chip/index.html',
    controller: 'LagashNewspapersPrintChipController',
    controllerAs: 'vm',
    resolve: {
      item: function($stateParams, Newspapers) {
        return Newspapers.get({
          _id: $stateParams.item_id
        }).$promise;
      },
      ejemplar: function($stateParams, NewspapersEjemplares) {
        return NewspapersEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });
}
