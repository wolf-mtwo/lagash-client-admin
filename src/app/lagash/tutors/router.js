export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/tutors';

  $stateProvider.state('lagash.tutors', {
    url: '/tutors',
    templateUrl: base_url + '/index.html',
    controller: 'LagashTutorsController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.tutors.list', {
    url: '/list',
    templateUrl: base_url + '/list/index.html',
    controller: 'LagashTutorsListController',
    controllerAs: 'vm',
    resolve: {
      size: function(Tutors) {
        return Tutors.size().$promise;
      }
    }
  });

  $stateProvider.state('lagash.tutors.list.main', {
    url: '/main',
    templateUrl: base_url + '/../template/index.html'
  });

  $stateProvider.state('lagash.tutors.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashTutorsCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.tutors.list.preview', {
    url: '/:tutor_id',
    templateUrl: base_url + '/update/index.html',
    controller: 'LagashTutorsUpdateController',
    controllerAs: 'vm',
    resolve: {
      tutor: function($stateParams, Tutors) {
        return Tutors.get({
          _id: $stateParams.tutor_id
        }).$promise;
      }
    }
  });
}
