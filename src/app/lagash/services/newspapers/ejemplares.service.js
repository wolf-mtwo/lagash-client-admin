export class NewspapersEjemplares {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/newspapers/ejemplares';
    return $resource(url + '/:_id', {
    }, {
      update: {
        method: 'PUT'
      },
      find: {
        method: 'GET',
        url: Global.PATH + '/v2/newspapers/:newspaper_id/ejemplares',
        isArray: true
      },
      save: {
        method: 'POST',
        url: Global.PATH + '/v2/newspapers/:newspaper_id/ejemplares'
      }
    });
  }
}
