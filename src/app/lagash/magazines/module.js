import { router } from './router';
import { LagashMagazinesController } from './controller';
import { LagashMagazinesCreateController } from './create/controller';
import { LagashMagazinesUpdateController } from './update/controller';
import { LagashMagazinesEjemplarController } from './ejemplar/controller';
import { LagashMagazinesListController } from './list/controller';
import { LagashMagazinesPrintController } from './print/controller';
import { LagashMagazinesCatalogController } from './catalog/controller';
import { LagashMagazinesCatalogUpdateController } from './catalog/update/controller';

angular.module('wolf.lagash.magazines', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashMagazinesController', LagashMagazinesController)
.controller('LagashMagazinesCreateController', LagashMagazinesCreateController)
.controller('LagashMagazinesUpdateController', LagashMagazinesUpdateController)
.controller('LagashMagazinesEjemplarController', LagashMagazinesEjemplarController)
.controller('LagashMagazinesListController', LagashMagazinesListController)
.controller('LagashMagazinesPrintController', LagashMagazinesPrintController)
.controller('LagashMagazinesCatalogController', LagashMagazinesCatalogController)
.controller('LagashMagazinesCatalogUpdateController', LagashMagazinesCatalogUpdateController)
.run(($log) => {
  $log.debug('run lagash magazines end');
});
