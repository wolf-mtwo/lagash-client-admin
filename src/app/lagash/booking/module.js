import { router } from './router';
import { LagashBookingController } from './controller';
import { LagashBookingHistoryController } from './history/controller';
import { LagashBookingLoansController } from './loans/controller';
import { LagashBookingReturnsController } from './returns/controller';
import { LagashBookingReserveController } from './reserve/controller';

angular.module('wolf.lagash.booking', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashBookingController', LagashBookingController)
.controller('LagashBookingHistoryController', LagashBookingHistoryController)
.controller('LagashBookingLoansController', LagashBookingLoansController)
.controller('LagashBookingReturnsController', LagashBookingReturnsController)
.controller('LagashBookingReserveController', LagashBookingReserveController)
.run(($log) => {
  $log.debug('run lagash booking end');
});
