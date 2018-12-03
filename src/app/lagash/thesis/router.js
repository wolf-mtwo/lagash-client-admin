export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.thesis', {
    url: '/thesis',
    template: require('./index.html'),
    controller: 'LagashThesisController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.thesis.list', {
    url: '/list',
    template: require('./list/index.html'),
    controller: 'LagashThesisListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Thesis) {
        return Thesis.size().$promise;
      }
    }
  });
  $stateProvider.state('lagash.thesis.list.main', {
    url: '/main',
    template: require('../template/index.html')
  });

  // $stateProvider.state('lagash.thesis.list.create', {
  //   url: '/create',
  //   template: require('./create/index.html'),
  //   controller: 'LagashThesisCreateController',
  //   controllerAs: 'vm'
  // });

  $stateProvider.state('lagash.thesis.list.catalog', {
    url: '/catalog',
    template: require('./catalog/index.html'),
    controller: 'LagashThesisCatalogController',
    controllerAs: 'vm',
    resolve: {
      size: function(ThesisCatalog) {
        return ThesisCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.thesis.list.faculties', {
    url: '/faculties',
    template: require('./faculties/index.html'),
    controller: 'LagashThesisFacultiesController',
    controllerAs: 'vm',
    resolve: {
      size: function(Faculties) {
        return Faculties.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.thesis.list.catalog_preview', {
    url: '/catalog/:catalog_id',
    template: require('./catalog/update/index.html'),
    controller: 'LagashThesisCatalogUpdateController',
    controllerAs: 'vm',
    resolve: {
      catalog: function($stateParams, ThesisCatalog) {
        return ThesisCatalog.get({
          _id: $stateParams.catalog_id
        }).$promise;
      },
    }
  });

  $stateProvider.state('lagash.thesis.list.faculty_preview', {
    url: '/faculties/:faculty_id',
    template: require('./faculties/update/index.html'),
    controller: 'LagashThesisFacultiesUpdateController',
    controllerAs: 'vm',
    resolve: {
      faculty: function($stateParams, Faculties) {
        return Faculties.get({
          _id: $stateParams.faculty_id
        }).$promise;
      },
    }
  });

  $stateProvider.state('lagash.thesis.list.preview', {
    url: '/:thesis_id',
    template: require('./update/index.html'),
    controller: 'LagashThesisUpdateController',
    controllerAs: 'vm',
    resolve: {
      thesis: function($stateParams, Thesis) {
        return Thesis.get({
          _id: $stateParams.thesis_id
        }).$promise;
      },
      ejemplares: function($stateParams, ThesisEjemplares) {
        return ThesisEjemplares.find({
          data_id: $stateParams.thesis_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('lagash.thesis.list.ejemplar', {
    url: '/:thesis_id/ejemplares/:ejemplar_id',
    template: require('./ejemplar/index.html'),
    controller: 'LagashThesisEjemplarController',
    controllerAs: 'vm',
    resolve: {
      thesis: function($stateParams, Thesis) {
        return Thesis.get({
          _id: $stateParams.thesis_id
        }).$promise;
      },
      ejemplar: function($stateParams, ThesisEjemplares) {
        return ThesisEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_thesis', {
    url: '/print/thesis/:thesis_id/ejemplares/:ejemplar_id',
    template: require('./print/index.html'),
    controller: 'LagashThesisPrintController',
    controllerAs: 'vm',
    resolve: {
      thesis: function($stateParams, Thesis) {
        return Thesis.get({
          _id: $stateParams.thesis_id
        }).$promise;
      },
      ejemplar: function($stateParams, ThesisEjemplares) {
        return ThesisEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('print_thesis_chip', {
    url: '/print/chip/thesis/:item_id/ejemplares/:ejemplar_id',
    template: require('./print/chip/index.html'),
    controller: 'LagashThesisPrintChipController',
    controllerAs: 'vm',
    resolve: {
      item: function($stateParams, Thesis) {
        return Thesis.get({
          _id: $stateParams.item_id
        }).$promise;
      },
      ejemplar: function($stateParams, ThesisEjemplares) {
        return ThesisEjemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });
}
