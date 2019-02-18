export class LagashNewspapersListController {

  constructor($state, $stateParams, $mdDialog, WError, WToast, Newspapers, size, UUID, BasicOption) {
    'ngInject';
    this.subscription_id = $stateParams.subscription_id;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Newspapers = Newspapers;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.newspapers = [];
    this.total = size.total;
    this.query = {
      subscription_id: this.subscription_id,
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Newspapers.subscriptions(self.query, function(items) {
        self.newspapers = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_newspapers() {
    this.on_pagination();
  }

  select_newspaper(item) {
    this.$state.go('lagash.newspapers.list.preview', {
      newspaper_id: item._id
    });
  }

  change_state(item) {
    this.Newspapers.update({
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

  create_newspaper(title) {
    var data = {
      _id: this.UUID.next(),
      code_material: this.BasicOption.get_code_material(),
      code_author: this.BasicOption.get_code_author(),
      enabled: false,
      catalog_id: this.subscription_id,
      // tags: null,
      // type: null,
      // cover: null,
      // length: 0,
      // width: 0,
      pages: 0,
      price: 0,
      // illustrations: null,
      // brings: null,
      month: (new Date()).getUTCMonth() + 1,
      day: (new Date()).getDate(),
      edition: 0,
      edition_date: new Date(),
      year: this.BasicOption.get_year(),
      title: title || 'SIN NOMBRE'
      // isbn: null
    };
    this.Newspapers.save(data).$promise
    .then((res) => {
      this.newspapers.unshift(res);
      this.select_newspaper(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  show_newspaper_create_dialog(ev) {
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
      self.create_newspaper(answer);
    }, function() {
      console.info('You cancelled the dialog.');
    });
  }
}
