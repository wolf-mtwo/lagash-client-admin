export class BooksEjemplares {

  constructor($resource, Global) {
    'ngInject';
    var url = Global.PATH + '/v1/book/ejemplares';
    return $resource(url + '/:_id', {
    }, {
      save: {
        method: 'POST',
        url: url
      },
      update: {
        method: 'PUT'
      },
      find: {
        method: 'GET',
        url: Global.PATH + '/v2/books/:data_id/ejemplares',
        isArray: true
      },
      pagination: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit'
      },
      search: {
        method: 'GET',
        isArray: true,
        url: url + '/page/:page/limit/:limit/search'
      },
      size: {
        method: 'GET',
        url: url + '/size'
      },
      next: {
        method: 'GET',
        url: url + '/next'
      },
      select: {
        method: 'GET',
        isArray: true,
        url: url + '/select'
      }
    });
  }
}
