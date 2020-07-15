export class LagashReadersListController {

  constructor($state, $mdDialog, WError, WToast, Readers, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Readers = Readers;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.readers = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Readers.search(self.query, function(items) {
        self.readers = items;
      }).$promise;
    }
    self.on_pagination();
  }

  select_reader(item) {
    this.$state.go('lagash.readers.list.preview', {
      reader_id: item._id
    });
  }

  change_state(item) {
    this.Readers.update({
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
