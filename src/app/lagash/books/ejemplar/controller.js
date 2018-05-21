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
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  save_ejemplar(ejemplar) {
    this.Ejemplares.update({
      _id: ejemplar._id
    }, ejemplar)
    .$promise
    .then((response) => {
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  delete_ejemplar(item) {
    this.Ejemplares.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.$state.go('lagash.books.list.main');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  print_ejemplar() {
    var url = this.$state.href('print_book', {
      book_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }
}
