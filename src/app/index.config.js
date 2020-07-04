export function config(
  $logProvider,
  toastrConfig,
  $httpProvider,
  $mdThemingProvider
) {
  'ngInject';

  // Theme
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  // .dark();

  // Enable log
  $logProvider.debugEnabled(true);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  // Session
  $httpProvider.interceptors.push('authInterceptorService');

  // Loading token
  var token =localStorage.getItem('token');
  if (token) {
    try {
      token = 'Bearer '+token;
      //$httpProvider.defaults.headers.common['x-access-token'] = session;
      $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      $httpProvider.defaults.headers.common['Authorization'] = token;
    } catch(e) {
      console.error('Session is no longer alive');
    }
  }
}
