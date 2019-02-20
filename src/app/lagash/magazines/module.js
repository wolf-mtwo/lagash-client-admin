import { router } from './router';
import { LagashMagazinesController } from './controller';
import { LagashMagazinesUpdateController } from './update/controller';
import { LagashMagazinesEjemplarController } from './ejemplar/controller';
import { LagashMagazinesListController } from './list/controller';
import { LagashMagazinesPrintController } from './print/controller';
import { LagashMagazinesSubscriptionController } from './subscription/controller';
import { LagashMagazinesCatalogController } from './catalog/controller';
import { LagashMagazinesCatalogUpdateController } from './catalog/update/controller';

import { LagashMagazinesPrintChipController } from './print/chip/controller';

angular.module('wolf.lagash.magazines', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashMagazinesController', LagashMagazinesController)
.controller('LagashMagazinesUpdateController', LagashMagazinesUpdateController)
.controller('LagashMagazinesEjemplarController', LagashMagazinesEjemplarController)
.controller('LagashMagazinesListController', LagashMagazinesListController)
.controller('LagashMagazinesPrintController', LagashMagazinesPrintController)
.controller('LagashMagazinesSubscriptionController', LagashMagazinesSubscriptionController)
.controller('LagashMagazinesCatalogController', LagashMagazinesCatalogController)
.controller('LagashMagazinesCatalogUpdateController', LagashMagazinesCatalogUpdateController)

.controller('LagashMagazinesPrintChipController', LagashMagazinesPrintChipController)
.run(($log) => {
  $log.debug('run lagash magazines end');
});
