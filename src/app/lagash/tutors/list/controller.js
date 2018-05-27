export class LagashTutorsListController {

  constructor($state, $mdDialog, WError, WToast, Tutors, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Tutors = Tutors;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.tutors = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Tutors.search(self.query, function(items) {
        self.tutors = items;
      }).$promise;
    }
    self.on_pagination();
  }

  select_tutor(item) {
    this.$state.go('lagash.tutors.list.preview', {
      tutor_id: item._id
    });
  }

  change_state(item) {
    this.Tutors.update({
      _id: item._id
    }, item)
    .$promise
    .then((response) => {
      this.WToast.show('El libro se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
