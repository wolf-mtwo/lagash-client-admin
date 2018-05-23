import { router } from './router';
import { LagashNewspapersController } from './controller';
import { LagashNewspapersCreateController } from './create/controller';
import { LagashNewspapersUpdateController } from './update/controller';
import { LagashNewspapersEjemplarController } from './ejemplar/controller';
import { LagashNewspapersListController } from './list/controller';
import { LagashNewspapersPrintController } from './print/controller';
import { LagashNewspapersCatalogController } from './catalog/controller';
import { LagashNewspapersCatalogUpdateController } from './catalog/update/controller';

angular.module('wolf.lagash.newspapers', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashNewspapersController', LagashNewspapersController)
.controller('LagashNewspapersCreateController', LagashNewspapersCreateController)
.controller('LagashNewspapersUpdateController', LagashNewspapersUpdateController)
.controller('LagashNewspapersEjemplarController', LagashNewspapersEjemplarController)
.controller('LagashNewspapersListController', LagashNewspapersListController)
.controller('LagashNewspapersPrintController', LagashNewspapersPrintController)
.controller('LagashNewspapersCatalogController', LagashNewspapersCatalogController)
.controller('LagashNewspapersCatalogUpdateController', LagashNewspapersCatalogUpdateController)
.run(($log) => {
  $log.debug('run lagash newspapers end');
});
