export class SearchReport {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v5/search';
    return $resource(url + '/:_id', {
    }, {
      total: {
        method: 'GET',
        isArray: true,
        url: url + '/total'
      }
    });
  }
}
