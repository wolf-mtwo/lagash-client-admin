export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/users';

  $stateProvider.state('lagash.users', {
    url: '/users',
    templateUrl: base_url + '/index.html',
    controller: 'LagashUsersController',
    controllerAs:'vm',
    resolve: {
      users: function(Users) {
        return Users.query().$promise;
      }
    }
  });

  $stateProvider.state('lagash.users.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashUsersCreateController',
    controllerAs:'vm'
  });

  $stateProvider.state('lagash.users.update', {
    url: '/:user_id',
    templateUrl: base_url + '/update/index.html',
    controller: 'LagashUsersUpdateController',
    controllerAs:'vm',
    resolve: {
      user: function($stateParams, Users) {
        return Users.get({
          _id: $stateParams.user_id
        }).$promise;
      }
    }
  });
}
