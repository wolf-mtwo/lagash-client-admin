export class AutorDialogs {

  constructor($mdDialog) {
    'ngInject';
    this.$mdDialog = $mdDialog;
  }

  show(ev, callback) {
    this.$mdDialog.show({
      controller: ($scope, $mdDialog, WError, UUID, Country, Authors, item) => {
        'ngInject';

        $scope.countries = Country.get();
        $scope.item = {
          _id: UUID.next(),
          country: 'bolivia'
        };

        $scope.cancel = () => {
          $mdDialog.cancel();
        };

        $scope.answer = (answer) => {
          Authors.save(answer).$promise
          .then((res) => {
            $mdDialog.hide(res);
          })
          .catch((err) => {
            WError.request(err);
          });
        };
      },
      templateUrl: 'app/lagash/dialogs/author/create.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then((answer) => {
      callback(answer);
    }, () => {
      console.info('You cancelled the dialog.');
    });
  }

  search(ev, callback) {
    this.$mdDialog.show({
      controller: ($scope, $mdDialog, WError, UUID, Authors, item) => {
        'ngInject';

        $scope.total = 100;
        $scope.query = {
          search: '',
          limit: 25,
          page: 1
        };
        Authors.size().$promise
        .then((res) => {
          $scope.total = res.total;
          $scope.on_pagination();
        })
        .catch((err) => {
          WError.request(err);
        });

        $scope.on_pagination = () => {
          Authors.search($scope.query, (items) => {
            $scope.authors = items;
          }).$promise;
        }

        $scope.search_author = (search) => {
          $scope.on_pagination();
        };

        $scope.select_author = (item) => {
          if (item) {
            $mdDialog.hide(item);
          } else {
            console.log('no existe un autor seleccionado');
          }
        };

        $scope.cancel = () => {
          $mdDialog.cancel();
        };
      },
      templateUrl: 'app/lagash/dialogs/author/search.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then((answer) => {
      callback(answer);
    }, () => {
      console.info('You cancelled the dialog.');
    });
  }
}
