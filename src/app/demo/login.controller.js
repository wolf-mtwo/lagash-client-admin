export class LoginController {
  constructor ($scope, $location, authService) {
    'ngInject';
    $scope.loginData = {
       userName: "",
       password: ""
   };

   $scope.message = "";

   $scope.login = function () {

       authService.login($scope.loginData).then(function (response) {

           $location.path('/orders');

       },
        function (err) {
            $scope.message = err.error_description;
        });
   };
  }
}
