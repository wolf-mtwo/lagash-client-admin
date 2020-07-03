export class Booking {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v4/booking';
    return $resource(url + '/:_id', {
    }, {
      save: {
        method: 'POST',
        url: url
      },
      update: {
        method: 'PUT'
      },
      pagination: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit'
      },
      search: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit/search'
      },
      size: {
        method: 'GET',
        url: url + '/size'
      },
      search: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit/search'
      },
      booked_list: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit/loans'
      },
      borrowed_list: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit/returns'
      },
      loan: {
        method: 'POST',
        url: url + '/loan'
      }
    });
  }
}
