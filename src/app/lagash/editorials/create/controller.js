export class LagashEditorialsCreateController {

  constructor(
    $state,
    WError,
    Editorials,
    UUID,
    Country,
    ImageService
  ) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Editorials = Editorials;
    this.UUID = UUID;
    this.ImageService = ImageService;

    this.countries = Country.get();
    
    this.item = {
      _id: UUID.next(),
      first_name: '',
      last_name: '',
      country: 'bolivia'
    };
  }

  register(item) {
    this.Editorials.save(item).$promise
    .then((res) => {
      this.$state.go('lagash.editorials.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
