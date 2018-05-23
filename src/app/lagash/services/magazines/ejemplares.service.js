export class MagazinesEjemplares {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/magazines/ejemplares';
    return $resource(url + '/:_id', {
    }, {
      update: {
        method: 'PUT'
      },
      find: {
        method: 'GET',
        url: Global.PATH + '/v2/magazines/:magazine_id/ejemplares',
        isArray: true
      },
      save: {
        method: 'POST',
        url: Global.PATH + '/v2/magazines/:magazine_id/ejemplares'
      }
    });
  }
}
