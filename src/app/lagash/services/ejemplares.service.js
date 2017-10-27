export class Ejemplares {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/ejemplares';
    return $resource(url + '/:_id', {
      _id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      find: {
        method: 'GET',
        url: Global.PATH + '/v2/books/:_id/ejemplares',
        isArray: true
      }
    });
  }
}
