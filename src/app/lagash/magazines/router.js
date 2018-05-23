export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/magazines';

  $stateProvider.state('lagash.magazines', {
    url: '/magazines',
    templateUrl: base_url + '/index.html',
    controller: 'LagashMagazinesController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.magazines.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
    controller: 'LagashMagazinesListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Magazines) {
        console.log('01');
        return Magazines.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.magazines.list.main', {
    url: '/main',
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.magazines.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashMagazinesCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.magazines.list.catalog', {
    url: '/catalog',
    templateUrl: base_url + '/catalog/index.html',
    controller: 'LagashMagazinesCatalogController',
    controllerAs: 'vm',
    resolve: {
      size: function(MagazinesCatalog) {
        return MagazinesCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.magazines.list.catalog_preview', {
    url: '/catalog/:catalog_id',
    templateUrl: base_url + '/catalog/update/index.html',
    controller: 'LagashMagazinesCatalogUpdateController',
    controllerAs: 'vm',
    resolve: {
      catalog: function($stateParams, MagazinesCatalog) {
        return MagazinesCatalog.get({
          _id: $stateParams.catalog_id
        }).$promise;
      },
    }
  });

  $stateProvider.state('lagash.magazines.list.preview', {
    url: '/:magazine_id',
    templateUrl: base_url + '/update/index.html',
    controller: 'LagashMagazinesUpdateController',
    controllerAs: 'vm',
    resolve: {
      magazine: function($stateParams, Magazines) {
        return Magazines.get({
          _id: $stateParams.magazine_id
        }).$promise;
      },
      ejemplares: function($stateParams, Ejemplares) {
        return Ejemplares.find({
          data_id: $stateParams.magazine_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('lagash.magazines.list.ejemplar', {
    url: '/:magazine_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/ejemplar/index.html',
    controller: 'LagashMagazinesEjemplarController',
    controllerAs: 'vm',
    resolve: {
      magazine: function($stateParams, Magazines) {
        return Magazines.get({
          _id: $stateParams.magazine_id
        }).$promise;
      },
      ejemplar: function($stateParams, Ejemplares) {
        return Ejemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_magazine', {
    url: '/print/magazine/:magazine_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/print/index.html',
    controller: 'LagashMagazinesPrintController',
    controllerAs: 'vm',
    resolve: {
      magazine: function($stateParams, Magazines) {
        return Magazines.get({
          _id: $stateParams.magazine_id
        }).$promise;
      },
      ejemplar: function($stateParams, Ejemplares) {
        return Ejemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  // TODO remove next iteraction
  // $stateProvider.state('lagash.magazines', {
  //   url: '/magazines',
  //   templateUrl: base_url + '/index.html',
  //   controller: 'LagashMagazinesController',
  //   controllerAs: 'vm'
  // });
  //
  // $stateProvider.state('lagash.magazines.list', {
  //   url: '/list',
  //   views: {
  //     'toolbar@lagash.magazines': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashMagazinesListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         // magazines: function(Magazines) {
  //         //   return Magazines.query().$promise;
  //         // },
  //         size: function(Magazines) {
  //           return Magazines.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.magazines': {
  //       templateUrl: base_url + '/../template/index.html'
  //     }
  //   }
  // });
  //
  // $stateProvider.state('lagash.magazines.create', {
  //   url: '/create',
  //   views: {
  //     'toolbar@lagash.magazines': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashMagazinesListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         size: function(Magazines) {
  //           return Magazines.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.magazines': {
  //       templateUrl: base_url + '/create/index.html',
  //       controller: 'LagashMagazinesCreateController',
  //       controllerAs: 'vm'
  //     }
  //   }
  // });
  //
  // $stateProvider.state('lagash.magazines.preview', {
  //   url: '/:magazine_id',
  //   views: {
  //     'toolbar@lagash.magazines': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashMagazinesListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         size: function(Magazines) {
  //           return Magazines.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.magazines': {
  //       templateUrl: base_url + '/update/index.html',
  //       controller: 'LagashMagazinesUpdateController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         magazine: function($stateParams, Magazines) {
  //           return Magazines.get({
  //             _id: $stateParams.magazine_id
  //           }).$promise;
  //         },
  //         ejemplares: function($stateParams, Ejemplares) {
  //           return Ejemplares.find({
  //             magazine_id: $stateParams.magazine_id
  //           }).$promise;
  //         }
  //       }
  //     }
  //   }
  // });
  //
  // $stateProvider.state('lagash.magazines.ejemplar', {
  //   url: '/:magazine_id/ejemplares/:ejemplar_id',
  //   views: {
  //     'toolbar@lagash.magazines': {
  //       templateUrl: base_url + '/list/index.html',
  //       controller: 'LagashMagazinesListController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         size: function(Magazines) {
  //           return Magazines.size().$promise;
  //         }
  //       }
  //     },
  //     'container@lagash.magazines': {
  //       templateUrl: base_url + '/ejemplar/index.html',
  //       controller: 'LagashMagazinesEjemplarController',
  //       controllerAs: 'vm',
  //       resolve: {
  //         magazine: function($stateParams, Magazines) {
  //           return Magazines.get({
  //             _id: $stateParams.magazine_id
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
