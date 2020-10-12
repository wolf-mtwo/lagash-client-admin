export class LoansReport {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v5/loans';
    return $resource(url + '/:_id', {
    }, {
      search: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit/search'
      }
    });
  }
}
