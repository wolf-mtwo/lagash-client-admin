export class Books {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/books';
    return $resource(url + '/:_id', {
    }, {
      update: {
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
