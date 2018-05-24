export class LagashAuthorsCreateController {

  constructor(
    $state,
    WError,
    Authors,
    UUID,
    Country,
    ImageService
  ) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Authors = Authors;
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
    this.Authors.save(item).$promise
    .then((res) => {
      this.$state.go('lagash.authors.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
