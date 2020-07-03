export class LagashMagazinesSubscriptionController {

  constructor($state, $mdDialog, WError, WToast, MagazinesCatalog, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.MagazinesCatalog = MagazinesCatalog;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.subscriptions = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      MagazinesCatalog.search(self.query, function(items) {
        self.subscriptions = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_subscriptions() {
    this.on_pagination();
  }

  select_subscription(item) {
    this.$state.go('lagash.magazines.list.main', {
      subscription_id: item._id
    });
  }

  create_catalog(title) {
    var data = {
      _id: this.UUID.next(),
      enabled: false,
      title: title || 'SIN NOMBRE'
    };
    this.MagazinesCatalog.save(data).$promise
    .then((res) => {
      this.subscriptions.unshift(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  change_state(item) {
    this.MagazinesCatalog.update({
      _id: item._id
    }, item)
    .$promise
    .then(() => {
      this.WToast.show('El catalogo se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  show_catalog_create_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: function DialogEditorialsCreateController($scope, $mdDialog, item) {
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
