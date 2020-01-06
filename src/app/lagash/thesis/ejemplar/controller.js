export class LagashThesisEjemplarController {

  constructor($state, WError, WToast, Thesis, UUID, ThesisEjemplares, thesis, ejemplar, Authors, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.Thesis = Thesis;
    this.WError = WError;
    this.WToast = WToast;
    this.ThesisEjemplares = ThesisEjemplares;
    this.item = thesis;
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
    this.ThesisEjemplares.update({
      _id: ejemplar._id
    }, ejemplar)
    .$promise
    .then((response) => {
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  delete_ejemplar(item) {
    this.ThesisEjemplares.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.$state.go('lagash.thesis.list.main');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  print_ejemplar() {
    var url = this.$state.href('print_thesis', {
      thesis_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }

  print_chip() {
    var url = this.$state.href('print_thesis_chip', {
      item_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }
  // dev raul
  print_file() {
    var url = this.$state.href('print_thesis_file', {
      item_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }
}
