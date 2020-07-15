import { router } from './router';
import { LagashReadersController } from './controller';
import { LagashReadersCreateController } from './create/controller';
import { LagashReadersUpdateController } from './update/controller';
import { LagashReadersListController } from './list/controller';

angular.module('wolf.lagash.readers', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashReadersController', LagashReadersController)
.controller('LagashReadersListController', LagashReadersListController)
.controller('LagashReadersCreateController', LagashReadersCreateController)
.controller('LagashReadersUpdateController', LagashReadersUpdateController)
.run(($log) => {
  $log.debug('run lagash readers end');
});
