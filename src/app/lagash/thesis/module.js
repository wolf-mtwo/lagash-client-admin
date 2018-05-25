import { router } from './router';
import { LagashThesisController } from './controller';
import { LagashThesisCreateController } from './create/controller';
import { LagashThesisUpdateController } from './update/controller';
import { LagashThesisEjemplarController } from './ejemplar/controller';
import { LagashThesisListController } from './list/controller';
import { LagashThesisPrintController } from './print/controller';

import { LagashThesisCatalogController } from './catalog/controller';
import { LagashThesisCatalogUpdateController } from './catalog/update/controller';
import { LagashThesisFacultiesController } from './faculties/controller';
import { LagashThesisFacultiesUpdateController } from './faculties/update/controller';

angular.module('wolf.lagash.thesis', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashThesisController', LagashThesisController)
.controller('LagashThesisCreateController', LagashThesisCreateController)
.controller('LagashThesisUpdateController', LagashThesisUpdateController)
.controller('LagashThesisEjemplarController', LagashThesisEjemplarController)
.controller('LagashThesisListController', LagashThesisListController)
.controller('LagashThesisPrintController', LagashThesisPrintController)

.controller('LagashThesisCatalogController', LagashThesisCatalogController)
.controller('LagashThesisCatalogUpdateController', LagashThesisCatalogUpdateController)
.controller('LagashThesisFacultiesController', LagashThesisFacultiesController)
.controller('LagashThesisFacultiesUpdateController', LagashThesisFacultiesUpdateController)
.run(($log) => {
  $log.debug('run lagash thesiss end');
});
