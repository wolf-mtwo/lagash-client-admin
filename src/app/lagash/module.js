import { router } from './router';
import { LagashController } from './controller';
import { LagashHomeController } from './home/controller';
import { LagashUsersController } from './users/controller';
import { LagashUsersCreateController } from './users/create/controller';
import { LagashUsersDetailController } from './users/detail/controller';
import { LagashUsersListController } from './users/list/controller';

angular.module('wolf.lagash', [
  'ui.router'
])
.config(router)
.controller('LagashController', LagashController)
.controller('LagashHomeController', LagashHomeController)
.controller('LagashUsersController', LagashUsersController)
.controller('LagashUsersCreateController', LagashUsersCreateController)
.controller('LagashUsersDetailController', LagashUsersDetailController)
.controller('LagashUsersListController', LagashUsersListController)
.run(($log) => {
  $log.debug('run lagash end');
});
