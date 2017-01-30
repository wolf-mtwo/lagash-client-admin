export class AuthInterceptorService {
  constructor($q, $location) {
    'ngInject';
    return {
      responseError: (response) => {
        if (response.status === 401) {
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }
}
