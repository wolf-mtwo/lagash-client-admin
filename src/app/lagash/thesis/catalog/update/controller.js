export class LagashThesisCatalogUpdateController {

  constructor($state, WError, WToast, ThesisCatalog, catalog) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.ThesisCatalog = ThesisCatalog;
    this.item = catalog;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  delete_item(item) {
    this.ThesisCatalog.remove({
      _id: item._id
    }, item).$promise
    .then(() => {
      this.$state.go('lagash.thesis.list.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update_item(item) {
    this.ThesisCatalog.update({
      _id: item._id
    }, item)
    .$promise
    .then(() => {
      this.$state.go('lagash.thesis.list.catalog');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
