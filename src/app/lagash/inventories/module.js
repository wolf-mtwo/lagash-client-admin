import { router } from './router';
import { LagashInventoriesController } from './controller';
// import { LagashInventoriesCreateController } from './create/controller';
// import { LagashInventoriesUpdateController } from './update/controller';
import { LagashInventoriesListController } from './list/controller';

angular.module('wolf.lagash.inventories', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashInventoriesController', LagashInventoriesController)
.controller('LagashInventoriesListController', LagashInventoriesListController)
// .controller('LagashInventoriesCreateController', LagashInventoriesCreateController)
// .controller('LagashInventoriesUpdateController', LagashInventoriesUpdateController)
.run(($log) => {
  $log.debug('run lagash inventories end');
});
