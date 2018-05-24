export class Editorials {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/editorial';
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
      },
      find_editorials: {
        method: 'GET',
        isArray: true,
        url: url + '/find'
      }
    });
  }
}
