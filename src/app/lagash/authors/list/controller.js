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
      limit: 40,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Authors.pagination(self.query, function(items) {
        self.authors = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_authors(search) {
    var self = this;
    this.query.search = search;
    this.Authors.search(self.query, function(items) {
      delete self.query['search'];
      self.authors = items;
    }).$promise;
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
    .then((response) => {
      this.WToast.show('El libro se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  // create_author(title) {
  //   var data = {
  //     _id: this.UUID.next(),
  //     enabled: false,
  //     tags: null,
  //     type: null,
  //     cover: null,
  //     length: 0,
  //     width: 0,
  //     pages: 0,
  //     price: 0,
  //     illustrations: null,
  //     brings: null,
  //     year: this.BasicOption.get_year(),
  //     title: title || 'SIN NOMBRE',
  //     isbn: null
  //   };
  //   this.Authors.save(data).$promise
  //   .then((res) => {
  //     this.authors.unshift(res);
  //     this.select_author(res);
  //   })
  //   .catch((err) => {
  //     this.WError.request(err);
  //   });
  // }

  // show_author_create_dialog(ev) {
  //   var self = this;
  //   this.$mdDialog.show({
  //     controller: function($scope, $mdDialog, item) {
  //       'ngInject';
  //
  //       $scope.hide = function() {
  //         $mdDialog.hide();
  //       };
  //
  //       $scope.cancel = function() {
  //         $mdDialog.cancel();
  //       };
  //
  //       $scope.answer = function(answer) {
  //         $mdDialog.hide(answer);
  //       };
  //     },
  //     templateUrl: 'app/lagash/authors/list/create.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     locals: {
  //        item: null
  //     }
  //   })
  //   .then(function(answer) {
  //     self.create_author(answer);
  //   }, function() {
  //     console.info('You cancelled the dialog.');
  //   });
  // }
}
