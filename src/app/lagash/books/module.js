import { router } from './router';
import { LagashBooksController } from './controller';
import { LagashBooksCreateController } from './create/controller';
import { LagashBooksUpdateController } from './update/controller';
import { LagashBooksEjemplarController } from './ejemplar/controller';
import { LagashBooksListController } from './list/controller';
import { LagashBooksPrintController } from './print/controller';
import { LagashBooksCatalogController } from './catalog/controller';
import { LagashBooksCatalogUpdateController } from './catalog/update/controller';

angular.module('wolf.lagash.books', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashBooksController', LagashBooksController)
.controller('LagashBooksCreateController', LagashBooksCreateController)
.controller('LagashBooksUpdateController', LagashBooksUpdateController)
.controller('LagashBooksEjemplarController', LagashBooksEjemplarController)
.controller('LagashBooksListController', LagashBooksListController)
.controller('LagashBooksPrintController', LagashBooksPrintController)
.controller('LagashBooksCatalogController', LagashBooksCatalogController)
.controller('LagashBooksCatalogUpdateController', LagashBooksCatalogUpdateController)
.run(($log) => {
  $log.debug('run lagash books end');
});
