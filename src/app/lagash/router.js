export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash';

  $stateProvider.state('lagash', {
    url: '/lagash',
    templateUrl: base_url + '/index.html',
    controller: 'LagashController',
    controllerAs:'vm'
  });
  $stateProvider.state('lagash.home', {
    url: '/home',
    templateUrl: base_url + '/home/index.html',
    controller: 'LagashHomeController',
    controllerAs:'vm'
  });
  $stateProvider.state('lagash.users', {
    // abstract: true,
    url: '/users',
    templateUrl: base_url + '/users/index.html',
    controller: 'LagashUsersController',
    controllerAs:'vm'
  });
  $stateProvider.state('lagash.users.list', {
    url: '/list',
    views: {
      'toolbar@lagash.users': {
        templateUrl: base_url + '/users/list/index.html',
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
        templateUrl: base_url + '/template/index.html'
      }
    }
  });
  $stateProvider.state('lagash.users.detail.create', {
    url: '/create',
    views: {
      'toolbar@lagash.users': {
        templateUrl: base_url + '/users/list/index.html',
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
        templateUrl: base_url + '/users/create/index.html',
        controller: 'LagashUsersCreateController',
        controllerAs:'vm'
      }
    }
  });
  $stateProvider.state('lagash.users.detail.preview', {
    url: '/:user_id',
    views: {
      'toolbar@lagash.users': {
        templateUrl: base_url + '/users/list/index.html',
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
        templateUrl: base_url + '/users/update/index.html',
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
