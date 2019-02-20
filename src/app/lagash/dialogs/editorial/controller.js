
export function DialogEditorialsCreateController2($scope, $mdDialog, WError, UUID, Country, Editorials, item) {
  'ngInject';

  $scope.item = {
    _id: UUID.next()
  };

  $scope.countries = Country.get();

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    Editorials.save(answer).$promise
    .then((res) => {
      $mdDialog.hide(res);
    })
    .catch((err) => {
      WError.request(err);
    });
  };
}

export function DialogEditorialsSearchController2($scope, $mdDialog, WError, UUID, Editorials, item) {
  'ngInject';

  $scope.query = {
    total: 100,
    limit: 25,
    page: 1
  };

  $scope.on_pagination = function() {
    Editorials.pagination($scope.query, function(items) {
      $scope.editorials = items;
    }).$promise;
  }

  $scope.search_item = function(search) {
    $scope.query.search = search;
    Editorials.search($scope.query, function(items) {
      $scope.editorials = items;
    }).$promise;
  };

  Editorials.size().$promise
  .then((res) => {
    $scope.query.total = res.total;
    $scope.on_pagination();
  })
  .catch((err) => {
    WError.request(err);
  });

  $scope.select_editorial = function(item) {
    if (item) {
      $mdDialog.hide(item);
    } else {
      console.log('no existe un editorial seleccionado');
    }
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}
