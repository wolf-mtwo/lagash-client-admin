import { router } from './router';
import { LagashEditorialsController } from './controller';
import { LagashEditorialsCreateController } from './create/controller';
import { LagashEditorialsUpdateController } from './update/controller';
import { LagashEditorialsListController } from './list/controller';

angular.module('wolf.lagash.editorials', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashEditorialsController', LagashEditorialsController)
.controller('LagashEditorialsListController', LagashEditorialsListController)
.controller('LagashEditorialsCreateController', LagashEditorialsCreateController)
.controller('LagashEditorialsUpdateController', LagashEditorialsUpdateController)
.run(($log) => {
  $log.debug('run lagash editorials end');
});
