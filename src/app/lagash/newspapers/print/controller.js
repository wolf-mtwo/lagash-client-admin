export class LagashNewspapersPrintController {

  constructor($state, WError, WToast, Newspapers, UUID, NewspapersEjemplares, newspaper, ejemplar) {
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
    this.item = newspaper;
  }
}
