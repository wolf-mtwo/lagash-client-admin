export class LagashMagazinesUpdateController {

  constructor($state, WError, $mdDialog, WToast, Magazines, UUID, Ejemplares, magazine, Authors, Editorials, AuthorsMap, EditorialsMap, ejemplares, MagazineOption, ImageService, MagazinesCatalog) {
    'ngInject';
    this.magazine_id = $state.params.magazine_id;
    this.ImageService = ImageService;
    this.$state = $state;
    this.WError = WError;
    this.WToast = WToast;
    this.$mdDialog = $mdDialog;
    this.Magazines = Magazines;
    this.AuthorsMap = AuthorsMap;
    this.MagazinesCatalog = MagazinesCatalog;
    this.Editorials = Editorials;
    this.EditorialsMap = EditorialsMap;
    this.UUID = UUID;
    this.Ejemplares = Ejemplares;

    this.create_ejemplar_state = false;
    // this.types = MagazineOption.types;
    // this.covers = MagazineOption.covers;
    // this.illustrations = MagazineOption.illustrations;
    // this.brings = MagazineOption.brings;
    this.months = MagazineOption.months;
    this.years = MagazineOption.getYears();

    this.authors = [];
    this.editorial = null;
    this.catalog = null;

    this.ejemplares = ejemplares;

    magazine.tags = magazine.tags ? magazine.tags.split(',') : [];
    // magazine.illustrations = magazine.illustrations ? magazine.illustrations.split(',') : [];
    // magazine.brings = magazine.brings ? magazine.brings.split(',') : [];
    this.item = magazine;

    // autor
    Authors.find_authors({
      resource_id: this.magazine_id
    }).$promise
    .then((res) => {
      this.authors = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });

    this.load_editorial();
    this.load_catalog();
  }

  load_editorial() {
    if (!this.item.editorial_id) {
       console.log('editorial_id is undefined');
       return;
    }
    this.Editorials.get({
      _id: this.item.editorial_id
    }).$promise
    .then((res) => {
      this.editorial = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  load_catalog() {
    if (!this.item.catalog_id) {
       console.log('catalog_id is undefined');
       return;
    }
    this.MagazinesCatalog.get({
      _id: this.item.catalog_id
    }).$promise
    .then((res) => {
      this.catalog = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  upload(file) {
    const self = this;
    this.ImageService.upload(file, function(res) {
      self.item.image = res.name;
    });
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  delete(item) {
    this.Magazines.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.$state.go('lagash.magazines.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    var data = {};
    angular.copy(item, data);
    data.tags = data.tags.join(',');
    // data.illustrations = data.illustrations.join(',');
    // data.brings = data.brings.join(',');
    this.Magazines.update({
      _id: item._id
    }, data)
    .$promise
    .then((response) => {
      this.$state.go('lagash.magazines.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  save_ejemplar(item) {
    item.data_id = this.magazine_id;
    item.enabled = false;
    item.state = 'STORED';
    item.type = 'BOOK';
    this.Ejemplares.save({
      data_id: item.data_id
    }, item).$promise
    .then((response) => {
      this.create_ejemplar_state = false;
      this.WToast.show('El ejemplar se guardo correctamente');
      this.ejemplares.push(response);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  create_ejemplar() {
    this.create_ejemplar_state = true;
    this.ejemplar_item = {
      _id: this.UUID.next(),
      index: this.getIndex()
    }
  }

  select_ejemplar(ejemplar) {
    this.$state.go('lagash.magazines.list.ejemplar', {
      magazine_id: this.magazine_id,
      ejemplar_id: ejemplar._id
    });
  }

  getIndex() {
    let existElement = (index) => {
      let result = false;
      this.ejemplares.map((item) => {
        if (item.index === index) {
          result = true;
        }
      })
      return result;
    };
    let count = 0;
    let isTrue = true;
    while(isTrue) {
      isTrue = existElement(++count);
    }
    return count;
  }

  change_ejemplar_state(ejemplar) {
    this.Ejemplares.update({
      _id: ejemplar._id
    }, ejemplar).$promise
    .then((response) => {
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  toggle(item, list) {
    var idx = list.indexOf(item.key);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item.key);
    }
  }

  exists(item, list) {
    return list.indexOf(item.key) > -1;
  }

  remove_author(item, index) {
    if (!item) {
        throw new Error('item is undefined');
    }
    this.AuthorsMap.remove({
      _id: item.map._id
    }).$promise
    .then((res) => {
      this.authors.splice(index, 1);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  remove_editorial(item) {
    if (!item) {
        throw new Error('item is undefined');
    }
    this.editorial = null;
    this.item.editorial_id = null;
  }

  remove_catalog() {
    this.catalog = null;
    this.item.catalog_id = null;
  }

  save_author(magazine, item) {
    this.AuthorsMap.save({
      _id: this.UUID.next(),
      author_id: item._id,
      type: 'BOOK',
      resource_id: magazine._id
    }).$promise
    .then((res) => {
      item.map = res;
      this.authors.push(item);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  // operations
  show_author_create_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: DialogAuthorsCreateController2,
      templateUrl: 'app/lagash/magazines/create/author/create.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.save_author(self.item, answer);
    }, function() {
      console.info('You cancelled the dialog.');
    });
  };

  show_author_search_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: DialogAuthorsSearchController2,
      templateUrl: 'app/lagash/magazines/create/author/search.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.save_author(self.item, answer);
    }, function() {
      console.info('You cancelled the dialog.');
    });
  };

  show_editorial_create_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: DialogEditorialsCreateController2,
      templateUrl: 'app/lagash/magazines/create/editorial/create.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.editorial = answer;
      self.item.editorial_id = answer._id;
    }, function() {
      console.info('You cancelled the dialog.');
    });
  };

  show_editorial_search_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: DialogEditorialsSearchController2,
      templateUrl: 'app/lagash/magazines/create/editorial/search.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.editorial = answer;
      self.item.editorial_id = answer._id;
    }, function() {
      console.info('You cancelled the dialog.');
    });
  }

  show_catalog_search_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: DialogCatalogSearchController2,
      templateUrl: 'app/lagash/magazines/create/catalog/search.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.catalog = answer;
      self.item.catalog_id = answer._id;
    }, function() {
      console.info('You cancelled the dialog.');
    });
  }
}

function DialogAuthorsCreateController2($scope, $mdDialog, WError, UUID, Country, Authors, item) {
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
    Authors.save(answer).$promise
    .then((res) => {
      $mdDialog.hide(res);
    })
    .catch((err) => {
      WError.request(err);
    });
  };
}

function DialogAuthorsSearchController2($scope, $mdDialog, WError, UUID, Authors, item) {
  'ngInject';

  $scope.query = {
    total: 100,
    limit: 25,
    page: 1
  };

  $scope.on_pagination = function() {
    Authors.pagination($scope.query, function(items) {
      $scope.authors = items;
    }).$promise;
  }

  $scope.search_author = function(search) {
    $scope.query.search = search;
    Authors.search($scope.query, function(items) {
      $scope.authors = items;
    }).$promise;
  };

  Authors.size().$promise
  .then((res) => {
    $scope.query.total = res.total;
    $scope.on_pagination();
  })
  .catch((err) => {
    WError.request(err);
  });

  $scope.select_author = function(item) {
    if (item) {
      $mdDialog.hide(item);
    } else {
      console.log('no existe un autor seleccionado');
    }
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}

function DialogEditorialsCreateController2($scope, $mdDialog, WError, UUID, Country, Editorials, item) {
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

function DialogEditorialsSearchController2($scope, $mdDialog, WError, UUID, Editorials, item) {
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

function DialogCatalogSearchController2($scope, $mdDialog, WError, UUID, MagazinesCatalog, item) {
  'ngInject';

  $scope.zise = {
    total: 0
  };
  $scope.query = {
    limit: 25,
    page: 1
  };

  $scope.on_pagination = function() {
    MagazinesCatalog.pagination($scope.query, function(items) {
      $scope.items = items;
    }).$promise;
  }

  $scope.search_items = function(search) {
    $scope.query.search = search;
    MagazinesCatalog.search($scope.query, function(items) {
      $scope.items = items;
    }).$promise;
  }

  MagazinesCatalog.size().$promise
  .then((res) => {
    $scope.zise = res;
    $scope.on_pagination();
  })
  .catch((err) => {
    WError.request(err);
  });

  $scope.select_item = function(item) {
    if (item) {
      $mdDialog.hide(item);
    } else {
      console.log('no existe un editorial seleccionado');
    }
  }

  $scope.hide = function() {
    $mdDialog.hide();
  }

  $scope.cancel = function() {
    $mdDialog.cancel();
  }
}
