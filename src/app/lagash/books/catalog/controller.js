export class LagashBooksCatalogController {

  constructor($state, WError, WToast, UUID, size, BookCatalog) {
    'ngInject';
    // this.$state = $state;
    // this.Books = Books;
    // this.WError = WError;
    // this.WToast = WToast;
    this.BookCatalog = BookCatalog;
    // this.item = book;
    // this.ejemplar = ejemplar;

    this.items = [];
    this.total = size.total;
    this.query = {
      limit: 40,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Books.pagination(self.query, function(items) {
        self.books = items;
      }).$promise;
    }
    self.on_pagination();
  }
}
