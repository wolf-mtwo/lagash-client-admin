export class LagashBooksListController {

  constructor($state, WError, WToast, Books, size) {
    'ngInject';
    this.$state = $state;
    this.WToast = WToast;
    this.Books = Books;
    this.WError = WError;

    this.total = size.total;
    this.query = {
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


  search_books(search) {
    var self = this;
    this.query.search = search;
    this.Books.search(self.query, function(items) {
      delete self.query['search'];
      self.books = items;
    }).$promise;
  }

  select(book) {
    this.$state.go('lagash.books.preview', {
      book_id: book._id
    });
  }

  change_state(item) {
    this.Books.update({
      _id: item._id
    }, item)
    .$promise
    .then((response) => {
      this.WToast.show('El libro se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }


}
