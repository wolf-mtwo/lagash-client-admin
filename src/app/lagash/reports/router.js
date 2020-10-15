export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.reports', {
    url: '/reports',
    template: require('./index.html'),
    controller: 'LagashReportsController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.reports.search', {
    url: '/search',
    template: require('./search/index.html'),
    controller: 'LagashReportsSearchController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.reports.loans', {
    url: '/loans',
    template: require('./loans/index.html'),
    controller: 'LagashReportsLoansController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.reports.faculties', {
    url: '/faculties',
    template: require('./faculties/index.html'),
    controller: 'LagashReportsFacultiesController',
    controllerAs: 'vm'
  });
}
