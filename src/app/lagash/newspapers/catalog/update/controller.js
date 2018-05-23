export class LagashNewspapersCatalogUpdateController {

  constructor($state, WError, WToast, NewspapersCatalog, catalog) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.NewspapersCatalog = NewspapersCatalog;
    this.item = catalog;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete_item(item) {
    this.NewspapersCatalog.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.$state.go('lagash.newspapers.list.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update_item(item) {
    this.NewspapersCatalog.update({
      _id: item._id
    }, item)
    .$promise
    .then((response) => {
      this.$state.go('lagash.newspapers.list.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
