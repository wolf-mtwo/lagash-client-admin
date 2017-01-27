import { router } from './router';
import { LoginController } from './login/controller';
import { SignupController } from './signup/controller';
import { ForgotController } from './forgot/controller';

angular.module('wolf.auth', [
  'ui.router'
])
.config(router)

.controller('LoginController', LoginController)
.controller('SignupController', SignupController)
.controller('ForgotController', ForgotController);
// .run(function (authService) {
//     console.log('run auth service');
//     // authService.fillAuthData();
// });
