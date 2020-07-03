export class LagashEditorialsListController {

  constructor($state, $mdDialog, WError, WToast, Editorials, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Editorials = Editorials;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.editorials = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Editorials.search(self.query, function(items) {
        self.editorials = items;
      }).$promise;
    }
    self.on_pagination();
  }

  select_editorial(item) {
    this.$state.go('lagash.editorials.list.preview', {
      editorial_id: item._id
    });
  }

  change_state(item) {
    this.Editorials.update({
      _id: item._id
    }, item)
    .$promise
    .then(() => {
      this.WToast.show('El libro se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
