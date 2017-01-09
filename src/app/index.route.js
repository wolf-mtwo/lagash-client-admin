export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider.when("/home", {
      controller: "HomeController",
      templateUrl: "/app/demo/views/home.html"
  });

  $routeProvider.when("/login", {
      controller: "LoginController",
      templateUrl: "/app/demo/views/login.html"
  });

  $routeProvider.when("/signup", {
      controller: "SignupController",
      templateUrl: "/app/demo/views/signup.html"
  });

  $routeProvider.when("/orders", {
      controller: "OrdersController",
      templateUrl: "/app/demo/views/orders.html"
  });

  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .otherwise({
      redirectTo: '/'
    });
}
