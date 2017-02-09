export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/users';

  $stateProvider.state('lagash.users', {
    url: '/users',
    templateUrl: base_url + '/index.html',
    controller: 'LagashUsersController',
    controllerAs:'vm'
  });

  $stateProvider.state('lagash.users.list', {
    url: '/list',
    views: {
      'toolbar@lagash.users': {
        templateUrl: base_url + '/list/index.html',
        controller: 'LagashUsersListController',
        controllerAs:'vm',
        resolve: {
          users: function(Users) {
            return Users.query().$promise
            .then((response) => {
              return response;
            });
          }
        }
      },
      'container@lagash.users': {
        templateUrl: base_url + '/../template/index.html'
      }
    }
  });

  $stateProvider.state('lagash.users.create', {
    url: '/create',
    views: {
      'toolbar@lagash.users': {
        templateUrl: base_url + '/list/index.html',
        controller: 'LagashUsersListController',
        controllerAs:'vm',
        resolve: {
          users: function(Users) {
            return Users.query().$promise
            .then((response) => {
              return response;
            });
          }
        }
      },
      'container@lagash.users': {
        templateUrl: base_url + '/create/index.html',
        controller: 'LagashUsersCreateController',
        controllerAs:'vm'
      }
    }
  });

  $stateProvider.state('lagash.users.preview', {
    url: '/:user_id',
    views: {
      'toolbar@lagash.users': {
        templateUrl: base_url + '/list/index.html',
        controller: 'LagashUsersListController',
        controllerAs:'vm',
        resolve: {
          users: function(Users) {
            return Users.query().$promise
            .then((response) => {
              return response;
            });
          }
        }
      },
      'container@lagash.users': {
        templateUrl: base_url + '/update/index.html',
        controller: 'LagashUsersUpdateController',
        controllerAs:'vm',
        resolve: {
          user: function($stateParams, Users) {
            return Users.get({
              _id: $stateParams.user_id
            }).$promise
            .then((response) => {
              return response;
            });
          }
        }
      }
    }
  });
}
