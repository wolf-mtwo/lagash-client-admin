export class LagashEditorialsUpdateController {

  constructor(
    $state,
    WError,
    Editorials,
    UUID,
    Country,
    ImageService,
    editorial
  ) {
    'ngInject';
    this.editorial_id = $state.params.editorial_id;
    this.$state = $state;
    this.WError = WError;
    this.Editorials = Editorials;
    this.UUID = UUID;
    this.ImageService = ImageService;

    this.countries = Country.get();
    this.item = editorial;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  delete(item) {
    this.Editorials.remove({
      _id: item._id
    }, item).$promise
    .then(() => {
      this.$state.go('lagash.editorials.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    this.Editorials.update({
      _id: item._id
    }, item)
    .$promise
    .then(() => {
      this.$state.go('lagash.editorials.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
