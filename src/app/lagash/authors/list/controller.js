export class LagashAuthorsListController {

  constructor($state, $mdDialog, WError, WToast, Authors, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Authors = Authors;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.authors = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Authors.search(self.query, function(items) {
        self.authors = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_authors() {
    this.on_pagination();
  }

  select_author(item) {
    this.$state.go('lagash.authors.list.preview', {
      author_id: item._id
    });
  }

  change_state(item) {
    this.Authors.update({
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
