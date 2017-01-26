/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { HomeController } from './home/controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { AuthService } from '../app/components/auth/auth.service';
import { AuthInterceptorService } from '../app/components/auth/auth.interceptor.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('wargos', [
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
.service('githubContributor', GithubContributorService)
.service('webDevTec', WebDevTecService)
.service('authService', AuthService)
.service('authInterceptorService', AuthInterceptorService)
.controller('HomeController', HomeController)
// .controller('HomeController', HomeController)
// .controller('SignupController', SignupController)
// .controller('LoginController', LoginController)
.directive('acmeNavbar', NavbarDirective)
.directive('acmeMalarkey', MalarkeyDirective)
.run(function (authService) {
    console.log('run auth service');
    authService.fillAuthData();
});
