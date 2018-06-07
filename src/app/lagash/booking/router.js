export function router($stateProvider) {
  'ngInject';
  var base_url = 'app/lagash/booking';

  $stateProvider.state('lagash.booking', {
    url: '/booking',
    templateUrl: base_url + '/index.html',
    controller: 'LagashBookingController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.booking.history', {
    url: '/history',
    templateUrl: base_url + '/history/index.html',
    controller: 'LagashBookingHistoryController',
    controllerAs: 'vm',
    resolve: {
      size: function(Booking) {
        return Booking.size().$promise;
      },
      model: function(Booking) {
        return Booking;
      }
    }
  });
  $stateProvider.state('lagash.booking.loans', {
    url: '/loans',
    templateUrl: base_url + '/loans/index.html',
    controller: 'LagashBookingLoansController',
    controllerAs: 'vm',
    resolve: {
      size: function(Booking) {
        return Booking.size().$promise;
      },
      model: function(Booking) {
        return Booking;
      }
    }
  });
  $stateProvider.state('lagash.booking.returns', {
    url: '/returns',
    templateUrl: base_url + '/returns/index.html',
    controller: 'LagashBookingReturnsController',
    controllerAs: 'vm',
    resolve: {
      size: function(Booking) {
        return Booking.size().$promise;
      },
      model: function(Booking) {
        return Booking;
      }
    }
  });
}
