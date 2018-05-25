import { router } from './router';
import { LagashTutorsController } from './controller';
import { LagashTutorsCreateController } from './create/controller';
import { LagashTutorsUpdateController } from './update/controller';
import { LagashTutorsListController } from './list/controller';

angular.module('wolf.lagash.tutors', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashTutorsController', LagashTutorsController)
.controller('LagashTutorsListController', LagashTutorsListController)
.controller('LagashTutorsCreateController', LagashTutorsCreateController)
.controller('LagashTutorsUpdateController', LagashTutorsUpdateController)
.run(($log) => {
  $log.debug('run lagash tutors end');
});
