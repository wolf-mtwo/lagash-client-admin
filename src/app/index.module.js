/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { HomeController } from './home/controller';
// import { AuthInterceptorService } from '../app/components/auth/auth.interceptor.service';

angular.module('wolf', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngMessages',
  'ngAria',
  'ngResource',
  'ngRoute',
  'ngMaterial',
  'toastr',
  'ui.router'
])
.constant('malarkey', malarkey)
.constant('moment', moment)
.config(config)
.config(routerConfig)
.run(runBlock)
// .service('authService', AuthService)
// .service('authInterceptorService', AuthInterceptorService)
.controller('HomeController', HomeController)
// .run(function (authService) {
//     console.log('run auth service');
//     // authService.fillAuthData();
// });
