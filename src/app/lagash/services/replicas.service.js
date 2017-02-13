export class Replicas {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/p1/replicas';
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
