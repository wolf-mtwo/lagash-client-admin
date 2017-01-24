(function() {
  'use strict';

  angular
    .module('wargos')
    .directive('headerNavbar', directiveComponent);

  /** @ngInject */
  function directiveComponent($state, Auth, Sess) {

    var user = null;

    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/header/header.html',
      scope: {
          options: '='
      },
      controller: headerController,
    };
    return directive;

    /** @ngInject */
    function headerController($scope, $mdSidenav) {
      Auth.subcrive(function(user) {
        $scope.user = user;
      });

      $scope.logout = function() {
        Sess.logout(function() {
            console.info('closed session');
            $state.go('home');
        });
      };

      $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
      };
    }
  }

})();
