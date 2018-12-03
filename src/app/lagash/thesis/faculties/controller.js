export class LagashThesisFacultiesController {

  constructor($state, $mdDialog, WError, WToast, UUID, size, Faculties) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.UUID = UUID;
    this.WError = WError;
    this.WToast = WToast;
    this.Faculties = Faculties;

    this.items = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Faculties.search(self.query, function(items) {
        self.items = items;
      }).$promise;
    }
    self.on_pagination();
  }

  change_state(item) {
    this.Faculties.update({
      _id: item._id
    }, item)
    .$promise
    .then((response) => {
      this.WToast.show('El catalogo se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  select_item(item) {
    this.$state.go('lagash.thesis.list.faculty_preview', {
      faculty_id: item._id
    });
  }

  create_catalog(title) {
    var data = {
      _id: this.UUID.next(),
      enabled: false,
      name: title || 'SIN NOMBRE'
    };
    this.Faculties.save(data).$promise
    .then((res) => {
      this.items.unshift(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  show_catalog_create_dialog(ev) {
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
      template: require('./create.html'),
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.create_catalog(answer);
    }, function() {
      console.info('You cancelled the dialog.');
    });
  };
}
