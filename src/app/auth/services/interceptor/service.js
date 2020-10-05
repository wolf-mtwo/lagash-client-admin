export class AuthInterceptorService {
  constructor($rootScope, $q, $location, Global) {
    'ngInject';
    return {
      request: (config) => {
        var token = localStorage.getItem('token');
        if (token) {
          try {
            token = 'Bearer ' + token;
            config.headers.Authorization = token;
          } catch(e) {
            console.error('Session is no longer alive');
          }
        } else {
          config.headers.Authorization = undefined;
        }
        return config;
      },
      responseError: (res) => {
        if (res.status === 401) {
          localStorage.clear();
          Global.start();
          $rootScope.$emit('login-required');
        }
        return $q.reject(res);
      }
    };
  }
}
