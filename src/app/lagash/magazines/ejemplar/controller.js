export class LagashMagazinesEjemplarController {

  constructor($state, WError, WToast, Magazines, UUID, MagazinesEjemplares, magazine, ejemplar, Authors, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.Magazines = Magazines;
    this.WError = WError;
    this.WToast = WToast;
    this.MagazinesEjemplares = MagazinesEjemplares;
    this.item = magazine;
    this.ejemplar = ejemplar;

    this.states = BasicOption.states;

    // autor
    Authors.find_authors({
      resource_id: this.item._id
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
    this.MagazinesEjemplares.update({
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
    this.MagazinesEjemplares.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.$state.go('lagash.magazines.list.main');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  print_ejemplar() {
    var url = this.$state.href('print_magazine', {
      magazine_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }

  print_chip() {
    var url = this.$state.href('print_magazine_chip', {
      item_id: this.item._id,
      ejemplar_id: this.ejemplar._id
    });
    window.open(url, '_blank');
  }
}
