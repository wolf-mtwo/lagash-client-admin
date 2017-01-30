import { router } from './router';
import { LagashController } from './controller';
import { LagashHomeController } from './home/controller';
import { LagashUsersController } from './users/controller';

angular.module('wolf.lagash', [
  'ui.router'
])
.config(router)
.controller('LagashController', LagashController)
.controller('LagashHomeController', LagashHomeController)
.controller('LagashUsersController', LagashUsersController)
.run(($log) => {
  $log.debug('run lagash end');
});
