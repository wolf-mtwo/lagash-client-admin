export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/users';

  $stateProvider.state('lagash.users', {
    abstract: true,
    templateUrl: base_url + '/index.html',
    controller: 'LagashUsersController'
  });

  $stateProvider.state('lagash.users.list', {
    url: '/users',
    templateUrl: base_url + '/list/index.html',
    controller: 'LagashUsersListController',
    controllerAs:'vm',
    resolve: {
      users: function(Users) {
        return Users.query().$promise;
      }
    }
  });

  $stateProvider.state('lagash.users.list.create', {
    url: '/create',
    templateUrl: base_url + '/create/index.html',
    controller: 'LagashUsersCreateController',
    controllerAs:'vm'
  });

  $stateProvider.state('lagash.users.list.update', {
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
