import { router } from './router';
import { LagashController } from './controller';
import { LagashHomeController } from './home/controller';
import LagashUsers from './users/module';

angular.module('wolf.lagash', [
  'ui.router',
  'wolf.lagash.users'
])
.config(router)
.controller('LagashController', LagashController)
.controller('LagashHomeController', LagashHomeController)
.run(($log) => {
  $log.debug('run lagash end');
});
