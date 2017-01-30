import { router } from './router';
import { LagashController } from './controller';
import { LagashHomeController } from './home/controller';

angular.module('wolf.lagash', [
  'ui.router'
])
.config(router)
.controller('LagashController', LagashController)
.controller('LagashHomeController', LagashHomeController)
.run(($log) => {
  $log.debug('run lagash end');
});
