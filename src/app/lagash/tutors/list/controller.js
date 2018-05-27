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

  // create_tutor(title) {
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
  //   this.Tutors.save(data).$promise
  //   .then((res) => {
  //     this.tutors.unshift(res);
  //     this.select_tutor(res);
  //   })
  //   .catch((err) => {
  //     this.WError.request(err);
  //   });
  // }

  // show_tutor_create_dialog(ev) {
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
  //     templateUrl: 'app/lagash/tutors/list/create.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     locals: {
  //        item: null
  //     }
  //   })
  //   .then(function(answer) {
  //     self.create_tutor(answer);
  //   }, function() {
  //     console.info('You cancelled the dialog.');
  //   });
  // }
}
