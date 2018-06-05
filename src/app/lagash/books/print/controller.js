export class LagashBooksPrintController {

  constructor($state, WError, WToast, Books, UUID, BooksEjemplares, book, ejemplar) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.WToast = WToast;
    this.ejemplar = ejemplar;

    this.states = [{
      value: 'Guardado',
      key: 'STORED'
    }, {
      value: 'Reservado',
      key: 'BOOKED'
    }, {
      value: 'Prestado',
      key: 'BORROWED'
    }];

    book.tags = book.tags ? book.tags.split(',').join(', ') : 'NO EXISTE';
    book.illustrations = book.illustrations ? book.illustrations.split(',').join(', ') : 'NO EXISTE';
    book.brings = book.brings ? book.brings.split(',').join(', ') : 'NO EXISTE';
    this.item = book;
  }
}
