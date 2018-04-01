export class Users {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/p1/users';
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
        isArray: true
      }
    });
  }
}
