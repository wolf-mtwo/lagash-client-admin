export class LagashBooksUpdateController {

  constructor($state, WError, Books, book) {
    'ngInject';
    this.$state = $state;
    this.Books = Books;
    this.WError = WError;
    this.item = book;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete(book) {
    this.Books.remove(book).$promise
    .then((response) => {
      this.$state.go('lagash.books.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    item.role = "admin";
    this.Books.update(item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.books.list');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
