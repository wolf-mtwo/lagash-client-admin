import { router } from './router';
import { LagashUsersController } from './controller';
import { LagashUsersCreateController } from './create/controller';
import { LagashUsersUpdateController } from './update/controller';

angular.module('wolf.lagash.users', [
  'ui.router'
])
.config(router)
.controller('LagashUsersController', LagashUsersController)
.controller('LagashUsersCreateController', LagashUsersCreateController)
.controller('LagashUsersUpdateController', LagashUsersUpdateController)
.run(($log) => {
  $log.debug('run lagash users end');
});
