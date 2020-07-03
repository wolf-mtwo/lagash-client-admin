export class LagashThesisFacultiesUpdateController {

  constructor($state, WError, UUID, WToast, Faculties, Carrers, faculty) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.UUID = UUID;
    this.Faculties = Faculties;
    this.Carrers = Carrers;
    this.item = faculty;

    this.Carrers.find({
      faculty_id: this.item._id
    }).$promise
    .then((res) => {
      this.carrers = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  save_carrer(name) {
    var data = {
      _id: this.UUID.next(),
      faculty_id: this.item._id,
      name: name || 'SIN NOMBRE'
    };
    this.Carrers.save(data).$promise
    .then((res) => {
      this.carrers.unshift(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  remove_carrers(item, index) {
    if (!item) {
        throw new Error('item is undefined');
    }
    this.Carrers.remove({
      _id: item._id
    }).$promise
    .then(() => {
      this.carrers.splice(index, 1);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  delete_item(item) {
    this.Faculties.remove({
      _id: item._id
    }, item).$promise
    .then(() => {
      this.$state.go('lagash.thesis.list.faculties');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update_item(item) {
    this.Faculties.update({
      _id: item._id
    }, item)
    .$promise
    .then(() => {
      this.$state.go('lagash.thesis.list.faculties');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
