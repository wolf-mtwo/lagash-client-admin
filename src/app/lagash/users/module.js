import { router } from './router';
import { LagashUsersController } from './controller';
import { LagashUsersListController } from './list/controller';
import { LagashUsersCreateController } from './create/controller';
import { LagashUsersUpdateController } from './update/controller';

angular.module('wolf.lagash.users', [
  'ui.router'
])
.config(router)
.controller('LagashUsersController', LagashUsersController)
.controller('LagashUsersCreateController', LagashUsersCreateController)
.controller('LagashUsersUpdateController', LagashUsersUpdateController)
.controller('LagashUsersListController', LagashUsersListController)
.run(($log) => {
  $log.debug('run lagash users end');
});
