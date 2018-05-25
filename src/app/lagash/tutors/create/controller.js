export class LagashTutorsCreateController {

  constructor(
    $state,
    WError,
    Tutors,
    UUID,
    Country,
    ImageService
  ) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Tutors = Tutors;
    this.UUID = UUID;
    this.ImageService = ImageService;

    this.countries = Country.get();

    this.item = {
      _id: UUID.next(),
      first_name: '',
      last_name: '',
      degree: 'Lic.',
      country: 'bolivia'
    };
  }

  register(item) {
    this.Tutors.save(item).$promise
    .then((res) => {
      this.$state.go('lagash.tutors.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
