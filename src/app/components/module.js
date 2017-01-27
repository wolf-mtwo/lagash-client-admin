import { Global } from './global/service';
import { WError } from './error/service';

angular.module('wolf.components', [])
.service('Global', Global)
.service('WError', WError)
.run(($log) => {
  $log.debug('run components end');
});
