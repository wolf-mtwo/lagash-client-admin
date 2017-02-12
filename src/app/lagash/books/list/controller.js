export class LagashBooksListController {

  constructor($state, WError, WToast, Books, books) {
    'ngInject';
    this.$state = $state;
    this.books = books;
    this.WToast = WToast;
    this.Books = Books;
    this.WError = WError;
  }

  select(book) {
    this.$state.go('lagash.books.preview', {
      book_id: book._id
    });
  }

  change_state(book) {
    this.Books.update(book)
    .$promise
    .then((response) => {
      this.WToast.show('El libro se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
