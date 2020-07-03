export class AuthInterceptorService {
  constructor($q, $location) {
    'ngInject';
    return {
      responseError: (res) => {
        if (res.status === 401) {
          $location.path('/login');
        }
        return $q.reject(res);
      }
    };
  }
}
