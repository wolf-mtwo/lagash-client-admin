export class LagashNewspapersSubscriptionController {

  constructor($state, $mdDialog, WError, WToast, NewspapersCatalog, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.NewspapersCatalog = NewspapersCatalog;
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
      NewspapersCatalog.search(self.query, function(items) {
        self.subscriptions = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_subscriptions() {
    this.on_pagination();
  }

  select_subscription(item) {
    this.$state.go('lagash.newspapers.list.main', {
      subscription_id: item._id
    });
  }

  create_catalog(title) {
    var data = {
      _id: this.UUID.next(),
      enabled: false,
      title: title || 'SIN NOMBRE'
    };
    this.NewspapersCatalog.save(data).$promise
    .then((res) => {
      this.subscriptions.unshift(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  change_state(item) {
    this.NewspapersCatalog.update({
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
      templateUrl: 'app/lagash/newspapers/subscription/create.html',
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
