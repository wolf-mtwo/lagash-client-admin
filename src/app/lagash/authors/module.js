import { router } from './router';
import { LagashAuthorsController } from './controller';
import { LagashAuthorsCreateController } from './create/controller';
import { LagashAuthorsUpdateController } from './update/controller';
import { LagashAuthorsListController } from './list/controller';

angular.module('wolf.lagash.authors', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashAuthorsController', LagashAuthorsController)
.controller('LagashAuthorsListController', LagashAuthorsListController)
.controller('LagashAuthorsCreateController', LagashAuthorsCreateController)
.controller('LagashAuthorsUpdateController', LagashAuthorsUpdateController)
.run(($log) => {
  $log.debug('run lagash authors end');
});
