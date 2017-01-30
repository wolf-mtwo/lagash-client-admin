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
    url: '/users',
    templateUrl: base_url + '/users/index.html',
    controller: 'LagashUsersController',
    controllerAs:'vm'
  });
  $stateProvider.state('lagash.users.create', {
    url: '/create',
    templateUrl: base_url + '/users/create/index.html',
    controller: 'LagashUsersCreateController',
    controllerAs:'vm'
  });
  $stateProvider.state('lagash.users.list', {
    url: '/list',
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
  });
}
