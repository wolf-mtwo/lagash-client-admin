import { router } from './router';
import { LagashInventoriesController } from './controller';
import { LagashInventoriesListController } from './list/controller';

angular.module('wolf.lagash.inventories', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashInventoriesController', LagashInventoriesController)
.controller('LagashInventoriesListController', LagashInventoriesListController)
.run(($log) => {
  $log.debug('run lagash inventories end');
});
