export class LagashBooksCatalogUpdateController {

  constructor($state, WError, $mdDialog, WToast, Books, UUID, BooksCatalog, catalog) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.BooksCatalog = BooksCatalog;
    this.item = catalog;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete_item(item) {
    this.BooksCatalog.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.$state.go('lagash.books.list.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update_item(item) {
    this.BooksCatalog.update({
      _id: item._id
    }, item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.books.list.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
