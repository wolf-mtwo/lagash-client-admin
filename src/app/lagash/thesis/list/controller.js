export class LagashThesisListController {

  constructor($state, WError, WToast, Thesis, size) {
    'ngInject';
    this.$state = $state;
    this.WToast = WToast;
    this.Thesis = Thesis;
    this.WError = WError;

    this.total = size.total;
    this.query = {
      limit: 40,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Thesis.pagination(self.query, function(items) {
        self.thesiss = items;
      }).$promise;
    }
    self.on_pagination();
  }


  search_thesiss(search) {
    var self = this;
    this.query.search = search;
    this.Thesis.search(self.query, function(items) {
      delete self.query['search'];
      self.thesiss = items;
    }).$promise;
  }

  select(thesis) {
    this.$state.go('lagash.thesis.list.preview', {
      thesis_id: thesis._id
    });
  }

  change_state(item) {
    this.Thesis.update({
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
