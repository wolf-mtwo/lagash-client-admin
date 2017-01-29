import { Global } from './global/service';
import { WError } from './error/service';
import { Store } from './store/service';

angular.module('wolf.components', [])
.service('Global', Global)
.service('WError', WError)
.service('Store', Store)
.run(($log) => {
  $log.debug('run components end');
});
