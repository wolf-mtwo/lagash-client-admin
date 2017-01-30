/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { HomeController } from './home/controller';
import Auth from './auth/module';
import Components from './components/module';
import Lagash from './lagash/module';

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
  'ui.router',
  'wolf.components',
  'wolf.auth',
  'wolf.lagash'
])
.constant('malarkey', malarkey)
.constant('moment', moment)
.config(config)
.config(routerConfig)
.run(runBlock)
.controller('HomeController', HomeController);
