export class LagashMagazinesPrintController {

  constructor($state, WError, WToast, Magazines, UUID, Ejemplares, magazine, ejemplar) {
    'ngInject';
    this.$state = $state;
    this.Magazines = Magazines;
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

    magazine.tags = magazine.tags ? magazine.tags.split(',').join(', ') : 'NO EXISTE';
    this.item = magazine;
  }
}
