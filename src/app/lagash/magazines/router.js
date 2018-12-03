export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.magazines', {
    url: '/magazines',
    template: require('./index.html'),
    controller: 'LagashMagazinesController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.magazines.subscriptions', {
    url: '/subscriptions',
    template: require('./subscription/index.html'),
    controller: 'LagashMagazinesSubscriptionController',
    controllerAs: 'vm',
    resolve: {
      size: function(MagazinesCatalog) {
        return MagazinesCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.magazines.subscriptions.main', {
    url: '/main',
    template: require('../template/index.html')
  });

  $stateProvider.state('lagash.magazines.list', {
    url: '/subscriptions/:subscription_id',
    template: require('./list/index.html'),
    controller: 'LagashMagazinesListController',
    controllerAs: 'vm',
      resolve: {
        size: function(Magazines) {
          return Magazines.size().$promise;
        }
      }
  });

  $stateProvider.state('lagash.magazines.list.main', {
    url: '/main',
    template: require('../template/index.html')
  });

  // $stateProvider.state('lagash.magazines.list.create', {
  //   url: '/create',
  //   template: require('./create/index.html'),
  //   controller: 'LagashMagazinesCreateController',
  //   controllerAs: 'vm'
  // });

  $stateProvider.state('lagash.magazines.list.preview', {
    url: '/:magazine_id',
    template: require('./update/index.html'),
    controller: 'LagashMagazinesUpdateController',
    controllerAs: 'vm',
    resolve: {
      magazine: function($stateParams, Magazines) {
        return Magazines.get({
          _id: $stateParams.magazine_id
        }).$promise;
      },
      ejemplares: function($stateParams, MagazinesEjemplares) {
        return MagazinesEjemplares.find({
          data_id: $stateParams.magazine_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('lagash.magazines.list.ejemplar', {
    url: '/:magazine_id/ejemplares/:ejemplar_id',
    template: require('./ejemplar/index.html'),
    controller: 'LagashMagazinesEjemplarController',
    controllerAs: 'vm',
    resolve: {
      magazine: function($stateParams, Magazines) {
        return Magazines.get({
          _id: $stateParams.magazine_id
        }).$promise;
      },
      ejemplar: function($stateParams, MagazinesEjemplares) {
        return MagazinesEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_magazine', {
    url: '/print/magazine/:magazine_id/ejemplares/:ejemplar_id',
    template: require('./print/index.html'),
    controller: 'LagashMagazinesPrintController',
    controllerAs: 'vm',
    resolve: {
      magazine: function($stateParams, Magazines) {
        return Magazines.get({
          _id: $stateParams.magazine_id
        }).$promise;
      },
      ejemplar: function($stateParams, MagazinesEjemplares) {
        return MagazinesEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_magazine_chip', {
    url: '/print/chip/magazine/:item_id/ejemplares/:ejemplar_id',
    template: require('./print/chip/index.html'),
    controller: 'LagashMagazinesPrintChipController',
    controllerAs: 'vm',
    resolve: {
      item: function($stateParams, Magazines) {
        return Magazines.get({
          _id: $stateParams.item_id
        }).$promise;
      },
      ejemplar: function($stateParams, MagazinesEjemplares) {
        return MagazinesEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });
}
