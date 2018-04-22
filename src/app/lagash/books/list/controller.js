export class LagashBooksListController {

  constructor($state, WError, WToast, Books, size) {
    'ngInject';
    this.$state = $state;
    this.WToast = WToast;
    this.Books = Books;
    this.WError = WError;

    this.query = {
      total: size.total,
      limit: 40,
      page: 1
    };
    var self = this;
    this.on_pagination = function() {
      Books.pagination(self.query, function(items) {
        self.books = items;
      }).$promise;
    }
    this.on_pagination();
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
