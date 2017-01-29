export class Session {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/p1/login';
    return $resource(url, {
      id: '@id'
    }, {
      login: {
      method: 'POST'
      },
      user: {
      method: 'GET'
      }
    });
  }
}
