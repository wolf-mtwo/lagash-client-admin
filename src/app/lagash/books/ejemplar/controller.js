export class LagashBooksEjemplarController {

  constructor($state, WError, WToast, Books, UUID, Ejemplares, book, ejemplar) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.WToast = WToast;
    this.Ejemplares = Ejemplares;
    this.item = book;
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
    this.ejemplar.state = this.states[ejemplar.state].key;
  }

  save_ejemplar(ejemplar) {
    this.Ejemplares.update(ejemplar)
    .$promise
    .then((response) => {
      response.state = this.states[response.state].key;
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
