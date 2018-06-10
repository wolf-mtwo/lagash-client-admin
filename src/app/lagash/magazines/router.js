export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/magazines';

  $stateProvider.state('lagash.magazines', {
    url: '/magazines',
    templateUrl: base_url + '/index.html',
    controller: 'LagashMagazinesController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.magazines.subscriptions', {
    url: '/subscriptions',
    templateUrl: base_url + '/subscription/index.html',
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
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.magazines.list', {
    url: '/subscriptions/:subscription_id',
    templateUrl: base_url + '/list/index.html',
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
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.magazines.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashMagazinesCreateController',
    controllerAs: 'vm'
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
      ejemplares: function($stateParams, MagazinesEjemplares) {
        return MagazinesEjemplares.find({
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
      ejemplar: function($stateParams, MagazinesEjemplares) {
        return MagazinesEjemplares.get({
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
      ejemplar: function($stateParams, MagazinesEjemplares) {
        return MagazinesEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_magazine_chip', {
    url: '/print/chip/magazine/:item_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/print/chip/index.html',
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
