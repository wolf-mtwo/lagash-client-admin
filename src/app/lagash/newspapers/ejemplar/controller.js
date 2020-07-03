export class LagashNewspapersEjemplarController {

  constructor($state, WError, WToast, Newspapers, UUID, NewspapersEjemplares, newspaper, ejemplar, Authors, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.Newspapers = Newspapers;
    this.WError = WError;
    this.WToast = WToast;
    this.NewspapersEjemplares = NewspapersEjemplares;
    this.item = newspaper;
    this.ejemplar = ejemplar;

    this.states = BasicOption.states;

    // autor
    Authors.find_authors({
      material_id: this.item._id
    }).$promise
    .then((res) => {
      this.authors = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  save_ejemplar(ejemplar) {
    this.NewspapersEjemplares.update({
      _id: ejemplar._id
    }, ejemplar)
    .$promise
    .then(() => {
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  delete_ejemplar(item) {
    this.NewspapersEjemplares.remove({
      _id: item._id
    }, item).$promise
    .then(() => {
      this.$state.go('lagash.newspapers.list.main');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  print_ejemplar() {
    var url = this.$state.href('print_newspaper', {
      newspaper_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }

  print_chip() {
    var url = this.$state.href('print_newspaper_chip', {
      item_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }
  // dev raul
  print_file() {
    var url = this.$state.href('print_newspaper_file', {
      item_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }
}
