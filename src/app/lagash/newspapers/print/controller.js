export class LagashNewspapersPrintController {

  constructor($state, WError, WToast, Newspapers, UUID, Ejemplares, newspaper, ejemplar) {
    'ngInject';
    this.$state = $state;
    this.Newspapers = Newspapers;
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

    newspaper.tags = newspaper.tags ? newspaper.tags.split(',').join(', ') : 'NO EXISTE';
    // newspaper.illustrations = newspaper.illustrations ? newspaper.illustrations.split(',').join(', ') : 'NO EXISTE';
    // newspaper.brings = newspaper.brings ? newspaper.brings.split(',').join(', ') : 'NO EXISTE';
    this.item = newspaper;
  }
}