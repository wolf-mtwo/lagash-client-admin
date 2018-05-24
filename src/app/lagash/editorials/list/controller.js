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
      limit: 40,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Editorials.pagination(self.query, function(items) {
        self.editorials = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_editorials(search) {
    var self = this;
    this.query.search = search;
    this.Editorials.search(self.query, function(items) {
      delete self.query['search'];
      self.editorials = items;
    }).$promise;
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
    .then((response) => {
      this.WToast.show('El libro se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  // create_editorial(title) {
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
  //   this.Editorials.save(data).$promise
  //   .then((res) => {
  //     this.editorials.unshift(res);
  //     this.select_editorial(res);
  //   })
  //   .catch((err) => {
  //     this.WError.request(err);
  //   });
  // }

  // show_editorial_create_dialog(ev) {
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
  //     templateUrl: 'app/lagash/editorials/list/create.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     locals: {
  //        item: null
  //     }
  //   })
  //   .then(function(answer) {
  //     self.create_editorial(answer);
  //   }, function() {
  //     console.info('You cancelled the dialog.');
  //   });
  // }
}
