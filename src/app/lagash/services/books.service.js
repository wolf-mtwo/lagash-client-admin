export class Books {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/books';
    return $resource(url + '/:_id', {
      _id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      findByEmail: {
        method: 'GET',
        // TODO made an specific method
        isArray: true
      }
    });
  }
}
