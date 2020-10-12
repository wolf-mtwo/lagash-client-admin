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
    controller: 'LagashReportsShearchController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.reports.loans', {
    url: '/loans',
    template: require('./loans/index.html'),
    controller: 'LagashReportsLoansController',
    controllerAs: 'vm',
    resolve: {
      size: function(Reports) {
        return Reports.size().$promise;
      },
      model: function(Reports) {
        return Reports;
      }
    }
  });

  $stateProvider.state('lagash.reports.returns', {
    url: '/returns',
    template: require('./returns/index.html'),
    controller: 'LagashReportsReturnsController',
    controllerAs: 'vm',
    resolve: {
      size: function(Reports) {
        return Reports.size().$promise;
      },
      model: function(Reports) {
        return Reports;

      }
    }
  });
}
