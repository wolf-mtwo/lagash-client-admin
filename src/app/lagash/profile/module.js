import { router } from './router';
import { LagashProfileController } from './controller';

angular.module('wolf.lagash.profile', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashProfileController', LagashProfileController)
.run(($log) => {
  $log.debug('run lagash inventories end');
});
