export class LagashThesisFacultiesUpdateController {

  constructor($state, WError, WToast, Faculties, faculty) {
    'ngInject';
    this.$state = $state;
    this.WError = WError;
    this.Faculties = Faculties;
    this.item = faculty;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete_item(item) {
    this.Faculties.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
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
    .then((response) => {
      this.$state.go('lagash.thesis.list.faculties');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
