import { router } from './router';
import { LagashController } from './controller';
import { LagashHomeController } from './home/controller';
import LagashUsers from './users/module';
import LagashBooks from './books/module';
import { Books } from './services/books.service';
import { UUID } from './services/uuid.service';
import { Author } from './services/author.service';
import { Country } from './services/country.service';
import { Ejemplares } from './services/ejemplares.service';

angular.module('wolf.lagash', [
  'ui.router',
  'wolf.lagash.users',
  'wolf.lagash.books'
])
.config(router)
.service('Books', Books)
.service('Author', Author)
.service('Country', Country)
.service('UUID', UUID)
.service('Ejemplares', Ejemplares)
.controller('LagashController', LagashController)
.controller('LagashHomeController', LagashHomeController)
.run(($log) => {
  $log.debug('run lagash end');
});
