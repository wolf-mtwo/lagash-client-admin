export class LagashTutorsUpdateController {

  constructor(
    $state,
    WError,
    Tutors,
    UUID,
    Country,
    ImageService,
    tutor
  ) {
    'ngInject';
    this.tutor_id = $state.params.tutor_id;
    this.$state = $state;
    this.WError = WError;
    this.Tutors = Tutors;
    this.UUID = UUID;
    this.ImageService = ImageService;

    this.countries = Country.get();
    this.item = tutor;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  upload(file) {
    const self = this;
    this.ImageService.upload(file, (res) => {
      self.item.image = res.name;
    });
  }

  delete(item) {
    this.Tutors.remove({
      _id: item._id
    }, item).$promise
    .then(() => {
      this.$state.go('lagash.tutors.list.main', {}, { reload: true });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    this.Tutors.update({
      _id: item._id
    }, item)
    .$promise
    .then(() => {
      this.$state.go('lagash.tutors.list.main', {}, { reload: true });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
