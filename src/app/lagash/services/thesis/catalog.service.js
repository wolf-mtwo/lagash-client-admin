export class ThesisCatalog {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v2/thesis/catalogs';
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
        url: url,
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
      }
    });
  }
}
