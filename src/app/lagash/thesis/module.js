import { router } from './router';
import { LagashThesisController } from './controller';
import { LagashThesisCreateController } from './create/controller';
import { LagashThesisUpdateController } from './update/controller';
import { LagashThesisEjemplarController } from './ejemplar/controller';
import { LagashThesisListController } from './list/controller';

angular.module('wolf.lagash.thesis', [
  'ui.router'
])
.config(router)
.controller('LagashThesisController', LagashThesisController)
.controller('LagashThesisCreateController', LagashThesisCreateController)
.controller('LagashThesisUpdateController', LagashThesisUpdateController)
.controller('LagashThesisEjemplarController', LagashThesisEjemplarController)
.controller('LagashThesisListController', LagashThesisListController)
.run(($log) => {
  $log.debug('run lagash thesiss end');
});
