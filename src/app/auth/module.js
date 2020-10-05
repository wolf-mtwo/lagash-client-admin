import { router } from './router';
import { LoginController } from './login/controller';
import { SignupController } from './signup/controller';
import { ForgotController } from './forgot/controller';
import { Auth } from './services/auth/service';
import { Sess } from './services/sess/service';
import { Session } from './services/session/service';
import { AuthInterceptorService } from './services/interceptor/service';
import { Users } from './services/users.service';

angular.module('wolf.auth', [
  'ui.router'
])
.config(router)
.service('Sess', Sess)
.service('Auth', Auth)
.service('Session', Session)
.service('Users', Users)
.service('AuthInterceptorService', AuthInterceptorService)
.controller('LoginController', LoginController)
.controller('SignupController', SignupController)
.controller('ForgotController', ForgotController)
.run(($log, Auth) => {
  $log.debug('run auth end');
  Auth.init();
});
