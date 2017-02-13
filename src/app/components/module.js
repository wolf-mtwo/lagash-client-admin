import { Global } from './global/service';
import { WError } from './error/service';
import { Store } from './store/service';
import { WToast } from './toast/service';

angular.module('wolf.components', [])
.service('Global', Global)
.service('WError', WError)
.service('WToast', WToast)
.service('Store', Store)
.run(($log) => {
  $log.debug('run components end');
});
