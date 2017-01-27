import { router } from './router';
import { LoginController } from './login/controller';
import { SignupController } from './signup/controller';
import { ForgotController } from './forgot/controller';
import { Sess } from './services/sess/service';
import { Auth } from './services/auth/service';
import { Session } from './services/session/service';

angular.module('wolf.auth', [
  'ui.router'
])
.config(router)
.service('Sess', Sess)
.service('Auth', Auth)
.service('Session', Session)
.controller('LoginController', LoginController)
.controller('SignupController', SignupController)
.controller('ForgotController', ForgotController);
// .run(function (authService) {
//     console.log('run auth service');
//     // authService.fillAuthData();
// });
