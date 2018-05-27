import { AutorDialogs } from './author/service';

angular.module('wolf.lagash.dialogs', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.service('AutorDialogs', AutorDialogs)
.run(($log) => {
  $log.debug('run lagash dialogs end');
});
