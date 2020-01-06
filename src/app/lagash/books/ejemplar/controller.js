export class LagashBooksEjemplarController {

  constructor($state, WError, WToast, Books, UUID, BooksEjemplares, book, ejemplar, Authors, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.WToast = WToast;
    this.BooksEjemplares = BooksEjemplares;
    this.item = book;
    this.ejemplar = ejemplar;

    this.states = BasicOption.states;

    // autor
    Authors.find_authors({
      material_id: this.item._id
    }).$promise
    .then((res) => {
      this.authors = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  save_ejemplar(ejemplar) {
    this.BooksEjemplares.update({
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
    this.BooksEjemplares.remove({
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

  print_chip() {
    var url = this.$state.href('print_book_chip', {
      item_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }

  // dev raul
  print_file() {
    var url = this.$state.href('print_book_file', {
      item_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }
}
