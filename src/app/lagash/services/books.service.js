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
      findByEmail: {
        method: 'GET',
        // TODO made an specific method
        isArray: true
      }
    });
  }
}
