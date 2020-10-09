export class LagashReadersCreateController {

  constructor(
    $state,
    WError,
    Readers,
    UUID,
    CardType,
    Faculties,
    Carrers,
    ImageService
  ) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Readers = Readers;
    this.UUID = UUID;
    this.ImageService = ImageService;

    this.cards = CardType.get();
    this.semesters = this.calc_ingress(this.get_years());
    this.item = {
      _id: UUID.next(),
      first_name: '',
      last_name: '',
      semester: '2007-A',
      auth_type: 'LOCAL'
    };

    Faculties.query().$promise
    .then((res) => {
      this.faculties = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });

    Carrers.query().$promise
    .then((res) => {
      this.carrers = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  upload(file) {
    const self = this;
    this.ImageService.upload(file, (res) => {
      self.item.image = res.name;
    });
  }

  register(item) {
    this.Readers.save(item).$promise
    .then(() => {
      this.$state.go('lagash.readers.list.main', {}, { reload: true });
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  get_years() {
    let result = [];
    let year = new Date().getFullYear();
    for (let index = 0; index < 20; index++) {
      result.push(year--);
    }
    return result;
  }

  calc_ingress(years) {
    let result = ['OTROS'];
    years.forEach((year) => {
      result.push(`${year}-A`);
      result.push(`${year}-B`);
    });
    return result;
  }
}
