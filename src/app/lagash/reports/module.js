import { router } from './router';
import { LagashReportsController } from './controller';
import { LagashReportsSearchController } from './search/controller';
import { LagashReportsLoansController } from './loans/controller';
import { LagashReportsFacultiesController } from './faculties/controller';
import { ReportUtils } from './services/utils.service';

angular.module('wolf.lagash.reports', [
  'ui.router',
  'wolf.lagash.services',
  'wolf.lagash.helpers'
])
.config(router)
.controller('LagashReportsController', LagashReportsController)
.controller('LagashReportsSearchController', LagashReportsSearchController)
.controller('LagashReportsLoansController', LagashReportsLoansController)
.controller('LagashReportsFacultiesController', LagashReportsFacultiesController)
.service('ReportUtils', ReportUtils)
.run(($log) => {
  $log.debug('run lagash reports end');
});
