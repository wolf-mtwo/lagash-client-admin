export class LagashThesisListController {

  constructor($state, $mdDialog, WError, WToast, Thesis, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Thesis = Thesis;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.thesis = [];
    this.total = size.total;
    this.query = {
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Thesis.pagination(self.query, function(items) {
        self.thesis = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_thesis(search) {
    var self = this;
    this.query.search = search;
    this.Thesis.search(self.query, function(items) {
      delete self.query['search'];
      self.thesis = items;
    }).$promise;
  }

  select_thesis(thesis) {
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
      this.WToast.show('La tesis se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  create_thesis(title) {
    var data = {
      _id: this.UUID.next(),
      enabled: false,
      tags: null,
      length: 0,
      width: 0,
      pages: 0,
      price: 0,
      illustrations: null,
      brings: null,
      year: this.BasicOption.get_year(),
      title: title || 'SIN NOMBRE'
    };
    this.Thesis.save(data).$promise
    .then((res) => {
      this.thesis.unshift(res);
      this.select_thesis(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  show_thesis_create_dialog(ev) {
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
      templateUrl: 'app/lagash/thesis/list/create.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.create_thesis(answer);
    }, function() {
      console.info('You cancelled the dialog.');
    });
  }
}
