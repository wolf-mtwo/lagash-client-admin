export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.newspapers', {
    url: '/newspapers',
    template: require('./index.html'),
    controller: 'LagashNewspapersController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.newspapers.subscriptions', {
    url: '/subscriptions',
    template: require('./subscription/index.html'),
    controller: 'LagashNewspapersSubscriptionController',
    controllerAs: 'vm',
    resolve: {
      size: function(NewspapersCatalog) {
        return NewspapersCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.newspapers.subscriptions.main', {
    url: '/main',
    template: require('./../template/index.html')
  });

  $stateProvider.state('lagash.newspapers.list', {
    url: '/subscriptions/:subscription_id',
    template: require('./list/index.html'),
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
    template: require('./../template/index.html')
  });

  // $stateProvider.state('lagash.newspapers.list.create', {
  //   url: '/create',
  //   template: require('./create/index.html'),
  //   controller: 'LagashNewspapersCreateController',
  //   controllerAs: 'vm'
  // });

  $stateProvider.state('lagash.newspapers.catalog', {
    url: '/catalog',
    template: require('./catalog/index.html'),
    controller: 'LagashNewspapersCatalogController',
    controllerAs: 'vm',
    resolve: {
      size: function(NewspapersCatalog) {
        return NewspapersCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.newspapers.catalog_preview', {
    url: '/catalog/:catalog_id',
    template: require('./catalog/update/index.html'),
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
    template: require('./update/index.html'),
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
    template: require('./ejemplar/index.html'),
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
    template: require('./print/index.html'),
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
    template: require('./print/chip/index.html'),
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
