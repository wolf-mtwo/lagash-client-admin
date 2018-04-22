export class Author {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/author';
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
      save: {
        method: 'POST',
        url: url,
      },
      pagination: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit'
      },
      size: {
        method: 'GET',
        url: url + '/size'
      }
    });
  }
}
