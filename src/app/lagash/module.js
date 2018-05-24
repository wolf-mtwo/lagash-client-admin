import { router } from './router';

import LagashUsers from './users/module';
import LagashBooks from './books/module';
import LagashThesis from './thesis/module';
import LagashMagazines from './magazines/module';
import LagashNewspapers from './newspapers/module';
import LagashAuthors from './authors/module';
import LagashEditorials from './editorials/module';
import LagashServices from './services/module';

import { LagashController } from './controller';
import { LagashHomeController } from './home/controller';

angular.module('wolf.lagash', [
  'ui.router',
  'wolf.lagash.users',
  'wolf.lagash.books',
  'wolf.lagash.thesis',
  'wolf.lagash.magazines',
  'wolf.lagash.newspapers',
  'wolf.lagash.authors',
  'wolf.lagash.editorials',
  'wolf.lagash.services'
])
.config(router)
.controller('LagashController', LagashController)
.controller('LagashHomeController', LagashHomeController)
.run(($log) => {
  $log.debug('run lagash end');
});
