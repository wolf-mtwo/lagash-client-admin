import { router } from './router';
import { LagashProfileController } from './controller';
// import { LagashInventoriesListController } from './list/controller';

angular.module('wolf.lagash.profile', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashProfileController', LagashProfileController)
// .controller('LagashInventoriesListController', LagashInventoriesListController)
.run(($log) => {
  $log.debug('run lagash inventories end');
});
