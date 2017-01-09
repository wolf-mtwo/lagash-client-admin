export class AuthInterceptorService {
  // constructor ($q, $location, localStorageService) {
  constructor ($q, $location) {
    'ngInject';
    // var localStorageService = {};
    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        // var authData = localStorageService.get('authorizationData');
        var authData = null;
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
  }
}
