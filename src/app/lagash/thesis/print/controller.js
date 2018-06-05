export class LagashThesisPrintController {

  constructor($state, WError, WToast, Books, UUID, ThesisEjemplares, thesis, ejemplar) {
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

    thesis.tags = thesis.tags ? thesis.tags.split(',').join(', ') : 'NO EXISTE';
    thesis.illustrations = thesis.illustrations ? thesis.illustrations.split(',').join(', ') : 'NO EXISTE';
    thesis.brings = thesis.brings ? thesis.brings.split(',').join(', ') : 'NO EXISTE';
    this.item = thesis;
  }
}
