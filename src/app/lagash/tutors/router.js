export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.tutors', {
    url: '/tutors',
    template: require('./index.html'),
    controller: 'LagashTutorsController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.tutors.list', {
    url: '/list',
    template: require('./list/index.html'),
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
    template: require('../template/index.html')
  });

  $stateProvider.state('lagash.tutors.list.create', {
    url: '/create',
    template: require('./create/index.html'),
    controller: 'LagashTutorsCreateController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.tutors.list.preview', {
    url: '/:tutor_id',
    template: require('./update/index.html'),
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
