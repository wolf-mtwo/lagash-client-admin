import { router } from './router';
import { LagashController } from './controller';
import { LagashHomeController } from './home/controller';
import LagashUsers from './users/module';
import LagashBooks from './books/module';
import { Books } from './services/books.service';
import { UUID } from './services/uuid.service';
import { Replicas } from './services/replicas.service';

angular.module('wolf.lagash', [
  'ui.router',
  'wolf.lagash.users',
  'wolf.lagash.books'
])
.config(router)
.service('Books', Books)
.service('UUID', UUID)
.service('Replicas', Replicas)
.controller('LagashController', LagashController)
.controller('LagashHomeController', LagashHomeController)
.run(($log) => {
  $log.debug('run lagash end');
});
