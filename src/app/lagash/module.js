import { router } from './router';
import { LagashController } from './controller';

angular.module('wolf.lagash', [
  'ui.router'
])
.config(router)
.controller('LagashController', LagashController)
.run(($log) => {
  $log.debug('run lagash end');
});
