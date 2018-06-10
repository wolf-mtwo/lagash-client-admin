import { router } from './router';
import { LagashNewspapersController } from './controller';
import { LagashNewspapersUpdateController } from './update/controller';
import { LagashNewspapersEjemplarController } from './ejemplar/controller';
import { LagashNewspapersListController } from './list/controller';
import { LagashNewspapersPrintController } from './print/controller';
import { LagashNewspapersSubscriptionController } from './subscription/controller';

import { LagashNewspapersPrintChipController } from './print/chip/controller';

angular.module('wolf.lagash.newspapers', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashNewspapersController', LagashNewspapersController)
.controller('LagashNewspapersUpdateController', LagashNewspapersUpdateController)
.controller('LagashNewspapersEjemplarController', LagashNewspapersEjemplarController)
.controller('LagashNewspapersListController', LagashNewspapersListController)
.controller('LagashNewspapersPrintController', LagashNewspapersPrintController)
.controller('LagashNewspapersSubscriptionController', LagashNewspapersSubscriptionController)

.controller('LagashNewspapersPrintChipController', LagashNewspapersPrintChipController)
.run(($log) => {
  $log.debug('run lagash newspapers end');
});
