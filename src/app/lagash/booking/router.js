export function router($stateProvider) {
  'ngInject';

  $stateProvider.state('lagash.booking', {
    url: '/booking',
    template: require('./index.html'),
    controller: 'LagashBookingController',
    controllerAs: 'vm'
  });

  $stateProvider.state('lagash.booking.history', {
    url: '/history',
    template: require('./history/index.html'),
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
    template: require('./loans/index.html'),
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
    template: require('./returns/index.html'),
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
  // dev raul
  $stateProvider.state('lagash.booking.reserve', {
    url: '/reserve',
    template: require('./reserve/index.html'),
    // controller: 'LagashBooksListController'
    controller: 'LagashBookingReserveController',
    controllerAs: 'vm',
    resolve: {
      size: function (Booking) {
        return Booking.size().$promise;
      },
      model: function (Booking) {
        return Booking;
      }
    }
  });
}
