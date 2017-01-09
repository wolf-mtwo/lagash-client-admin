export class HomeController {
  constructor ($scope, $timeout, webDevTec, toastr, $location, authService) {
    'ngInject';
    $scope.logOut = function () {
         authService.logOut();
         $location.path('/home');
     }

     $scope.authentication = authService.authentication;
  }
}
