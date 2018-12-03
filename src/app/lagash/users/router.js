export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/users';

  $stateProvider.state('lagash.users', {
    url: '/users',
    template: require('./index.html'),
    controller: 'LagashUsersController',
    controllerAs:'vm'
  });

  $stateProvider.state('lagash.users.list', {
    url: '/list',
    views: {
      'toolbar@lagash.users': {
        template: require('./list/index.html'),
        controller: 'LagashUsersListController',
        controllerAs:'vm',
        resolve: {
          users: function(Users) {
            return Users.query().$promise;
          }
        }
      },
      'container@lagash.users': {
        template: require('../template/index.html')
      }
    }
  });

  $stateProvider.state('lagash.users.create', {
    url: '/create',
    views: {
      'toolbar@lagash.users': {
        template: require('./list/index.html'),
        controller: 'LagashUsersListController',
        controllerAs:'vm',
        resolve: {
          users: function(Users) {
            return Users.query().$promise;
          }
        }
      },
      'container@lagash.users': {
        template: require('./create/index.html'),
        controller: 'LagashUsersCreateController',
        controllerAs:'vm'
      }
    }
  });

  $stateProvider.state('lagash.users.preview', {
    url: '/:user_id',
    views: {
      'toolbar@lagash.users': {
        template: require('./list/index.html'),
        controller: 'LagashUsersListController',
        controllerAs:'vm',
        resolve: {
          users: function(Users) {
            return Users.query().$promise;
          }
        }
      },
      'container@lagash.users': {
        template: require('./update/index.html'),
        controller: 'LagashUsersUpdateController',
        controllerAs:'vm',
        resolve: {
          user: function($stateParams, Users) {
            return Users.get({
              _id: $stateParams.user_id
            }).$promise;
          }
        }
      }
    }
  });
}
