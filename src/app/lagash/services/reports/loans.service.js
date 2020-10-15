export class LoansReport {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v5/loans';
    return $resource(url + '/:_id', {
    }, {
      daily: {
        method: 'GET',
        isArray: true,
        url: url + '/daily'
      },
      faculties: {
        method: 'GET',
        isArray: true,
        url: url + '/faculties'
      }
    });
  }
}
