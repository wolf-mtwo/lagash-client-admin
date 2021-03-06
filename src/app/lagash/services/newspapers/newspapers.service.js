export class Newspapers {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/newspapers';
    return $resource(url, {
    }, {
      get: {
        url: url + '/:_id',
        method: 'GET'
      },
      update: {
        url: url + '/:_id',
        method: 'PUT'
      },
      remove: {
        url: url + '/:_id',
        method: 'DELETE'
      },
      save: {
        method: 'POST',
        url: url
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
      subscriptions: {
        method: 'GET',
        isArray: true,
        url: url + '/catalog/:subscription_id/page/:page/limit/:limit'
      },
      size: {
        method: 'GET',
        url: url + '/size'
      }
    });
  }
}
