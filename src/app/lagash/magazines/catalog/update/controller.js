export class LagashMagazinesCatalogUpdateController {

  constructor($state, WError, WToast, MagazinesCatalog, catalog) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.MagazinesCatalog = MagazinesCatalog;
    this.item = catalog;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete_item(item) {
    this.MagazinesCatalog.remove({
      _id: item._id
    }, item).$promise
    .then(() => {
      this.$state.go('lagash.magazines.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update_item(item) {
    this.MagazinesCatalog.update({
      _id: item._id
    }, item)
    .$promise
    .then(() => {
      this.$state.go('lagash.magazines.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
