export class LagashMagazinesListController {

  constructor($state, $mdDialog, WError, WToast, Magazines, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Magazines = Magazines;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.magazines = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Magazines.search(self.query, function(items) {
        self.magazines = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_magazines() {
    this.on_pagination();
  }

  select_magazine(item) {
    this.$state.go('lagash.magazines.list.preview', {
      magazine_id: item._id
    });
  }

  change_state(item) {
    this.Magazines.update({
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

  create_magazine(title) {
    var data = {
      _id: this.UUID.next(),
      enabled: false,
      pages: 0,
      price: 0,
      month: (new Date()).getUTCMonth() + 1,
      edition: 0,
      edition_date: new Date(),
      year: this.BasicOption.get_year(),
      title: title || 'SIN NOMBRE'
    };
    this.Magazines.save(data).$promise
    .then((res) => {
      this.magazines.unshift(res);
      this.select_magazine(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  show_magazine_create_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: function($scope, $mdDialog, item) {
        'ngInject';

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      },
      templateUrl: 'app/lagash/magazines/list/create.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.create_magazine(answer);
    }, function() {
      console.info('You cancelled the dialog.');
    });
  }
}
