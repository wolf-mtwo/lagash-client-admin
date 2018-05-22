export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/thesis';

  $stateProvider.state('lagash.thesis', {
    url: '/thesis',
    templateUrl: base_url + '/index.html',
    controller: 'LagashThesisController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.thesis.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
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
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.thesis.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashThesisCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.thesis.list.catalog', {
    url: '/catalog',
    templateUrl: base_url + '/catalog/index.html',
    controller: 'LagashThesisCatalogController',
    controllerAs: 'vm',
    resolve: {
      size: function(ThesisCatalog) {
        return ThesisCatalog.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.thesis.list.catalog_preview', {
    url: '/catalog/:catalog_id',
    templateUrl: base_url + '/catalog/update/index.html',
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

  $stateProvider.state('lagash.thesis.list.preview', {
    url: '/:thesis_id',
    templateUrl: base_url + '/update/index.html',
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
          thesis_id: $stateParams.thesis_id
        }).$promise;
      }
    }
  });

  $stateProvider.state('lagash.thesis.list.ejemplar', {
    url: '/:thesis_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/ejemplar/index.html',
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

  $stateProvider.state('print_tesis', {
    url: '/print/thesis/:thesis_id/ejemplares/:ejemplar_id',
    templateUrl: base_url + '/print/index.html',
    controller: 'LagashThesisPrintController',
    controllerAs: 'vm',
    resolve: {
      thesis: function($stateParams, Thesis) {
        return Books.get({
          _id: $stateParams.tesis_id
        }).$promise;
      },
      ejemplar: function($stateParams, Ejemplares) {
        return Ejemplares.get({
          _id: $stateParams.ejemplar_id
        }).$promise;
      }
    }
  });
}
