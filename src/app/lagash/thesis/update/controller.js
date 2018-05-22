export class LagashThesisUpdateController {

  constructor($state, WError, $mdDialog, WToast, Thesis, UUID, Ejemplares, thesis, Author, Editorial, AuthorMap, EditorialMap, ejemplares, ThesisOption, ImageService, ThesisCatalog) {
    'ngInject';
    this.thesis_id = $state.params.thesis_id;
    this.ImageService = ImageService;
    this.$state = $state;
    this.WError = WError;
    this.WToast = WToast;
    this.$mdDialog = $mdDialog;
    this.Thesis = Thesis;
    this.AuthorMap = AuthorMap;
    this.ThesisCatalog = ThesisCatalog;
    // this.Editorial = Editorial;
    // this.EditorialMap = EditorialMap;
    this.UUID = UUID;
    this.Ejemplares = Ejemplares;

    this.create_ejemplar_state = false;
    // this.types = ThesisOption.types;
    this.covers = ThesisOption.covers;
    this.illustrations = ThesisOption.illustrations;
    this.brings = ThesisOption.brings;
    this.years = ThesisOption.getYears();

    this.authors = [];
    // this.editorial = null;
    this.catalog = null;

    this.ejemplares = ejemplares;

    thesis.tags = thesis.tags ? thesis.tags.split(',') : [];
    thesis.illustrations = thesis.illustrations ? thesis.illustrations.split(',') : [];
    thesis.brings = thesis.brings ? thesis.brings.split(',') : [];
    this.item = thesis;

    // autor
    Author.find_authors({
      resource_id: this.thesis_id
    }).$promise
    .then((res) => {
      this.authors = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });

    this.load_catalog();
    // if (!this.item.editorial_id) {
    //    console.log('no tiene editorial');
    //    return;
    // }
    // Editorial.get({
    //   _id: this.item.editorial_id
    // }).$promise
    // .then((res) => {
    //   this.editorial = res;
    // })
    // .catch((err) => {
    //   this.WError.request(err);
    // });

    // AuthorMap
    // EditorialMap
  }

  load_catalog() {
    if (!this.item.catalog_id) {
       console.log('catalog_id is undefined');
       return;
    }
    this.ThesisCatalog.get({
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
    this.Thesis.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.$state.go('lagash.thesis.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  update(item) {
    var data = {};
    angular.copy(item, data);
    data.tags = data.tags.join(',');
    data.illustrations = data.illustrations.join(',');
    data.brings = data.brings.join(',');
    this.Thesis.update({
      _id: item._id
    }, data)
    .$promise
    .then((response) => {
      this.$state.go('lagash.thesis.list.main', {}, {reload: true});
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  save_ejemplar(item) {
    item.data_id = this.thesis_id;
    item.enabled = false;
    item.state = 'STORED';
    item.type = 'THESIS';
    this.Ejemplares.save({
      data_id: this.thesis_id
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
    this.$state.go('lagash.thesis.list.ejemplar', {
      thesis_id: this.thesis_id,
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
    this.AuthorMap.remove({
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

  save_author(thesis, item) {
    this.AuthorMap.save({
      _id: this.UUID.next(),
      author_id: item._id,
      type: 'THESIS',
      resource_id: thesis._id
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
      controller: DialogAuthorCreateController2,
      templateUrl: 'app/lagash/thesis/create/author/create.html',
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
      controller: DialogAuthorSearchController2,
      templateUrl: 'app/lagash/thesis/create/author/search.html',
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

  // show_editorial_create_dialog(ev) {
  //   var self = this;
  //   this.$mdDialog.show({
  //     controller: DialogEditorialCreateController2,
  //     templateUrl: 'app/lagash/thesiss/create/editorial/create.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     locals: {
  //        item: null
  //     }
  //   })
  //   .then(function(answer) {
  //     self.editorial = answer;
  //     self.item.editorial_id = answer._id;
  //   }, function() {
  //     console.info('You cancelled the dialog.');
  //   });
  // };
  //
  // show_editorial_search_dialog(ev) {
  //   var self = this;
  //   this.$mdDialog.show({
  //     controller: DialogEditorialSearchController2,
  //     templateUrl: 'app/lagash/thesiss/create/editorial/search.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose: true,
  //     fullscreen: false,
  //     locals: {
  //        item: null
  //     }
  //   })
  //   .then(function(answer) {
  //     self.editorial = answer;
  //     self.item.editorial_id = answer._id;
  //   }, function() {
  //     console.info('You cancelled the dialog.');
  //   });
  // };

  show_catalog_search_dialog(ev) {
    var self = this;
    this.$mdDialog.show({
      controller: DialogCatalogSearchController2,
      templateUrl: 'app/lagash/thesis/create/catalog/search.html',
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

function DialogAuthorCreateController2($scope, $mdDialog, WError, UUID, Country, Author, item) {
  'ngInject';

  $scope.item = {
    _id: UUID.next(),
    country: 'bolivia'
  };

  $scope.countries = Country.get();

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    Author.save(answer).$promise
    .then((res) => {
      $mdDialog.hide(res);
    })
    .catch((err) => {
      WError.request(err);
    });
  };
}

function DialogAuthorSearchController2($scope, $mdDialog, WError, UUID, Author, item) {
  'ngInject';

  $scope.query = {
    total: 100,
    limit: 40,
    page: 1
  };

  $scope.on_pagination = function() {
    Author.pagination($scope.query, function(items) {
      $scope.authors = items;
    }).$promise;
  }

  $scope.search_author = function(search) {
    $scope.query.search = search;
    Author.search($scope.query, function(items) {
      $scope.authors = items;
    }).$promise;
  };

  Author.size().$promise
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
//
// function DialogEditorialCreateController2($scope, $mdDialog, WError, UUID, Country, Editorial, item) {
//   'ngInject';
//
//   $scope.item = {
//     _id: UUID.next()
//   };
//
//   $scope.countries = Country.get();
//
//   $scope.hide = function() {
//     $mdDialog.hide();
//   };
//
//   $scope.cancel = function() {
//     $mdDialog.cancel();
//   };
//
//   $scope.answer = function(answer) {
//     Editorial.save(answer).$promise
//     .then((res) => {
//       $mdDialog.hide(res);
//     })
//     .catch((err) => {
//       WError.request(err);
//     });
//   };
// }
//
// function DialogEditorialSearchController2($scope, $mdDialog, WError, UUID, Editorial, item) {
//   'ngInject';
//
//   $scope.query = {
//     total: 100,
//     limit: 40,
//     page: 1
//   };
//
//   $scope.on_pagination = function() {
//     Editorial.pagination($scope.query, function(items) {
//       $scope.editorials = items;
//     }).$promise;
//   }
//
//   $scope.search_author = function(search) {
//     $scope.query.search = search;
//     Editorial.search($scope.query, function(items) {
//       $scope.editorials = items;
//     }).$promise;
//   };
//
//   Editorial.size().$promise
//   .then((res) => {
//     $scope.query.total = res.total;
//     $scope.on_pagination();
//   })
//   .catch((err) => {
//     WError.request(err);
//   });
//
//   $scope.select_editorial = function(item) {
//     if (item) {
//       $mdDialog.hide(item);
//     } else {
//       console.log('no existe un editorial seleccionado');
//     }
//   };
//
//   $scope.hide = function() {
//     $mdDialog.hide();
//   };
//
//   $scope.cancel = function() {
//     $mdDialog.cancel();
//   };
// }

function DialogCatalogSearchController2($scope, $mdDialog, WError, UUID, ThesisCatalog, item) {
  'ngInject';

  $scope.zise = {
    total: 0
  };
  $scope.query = {
    limit: 40,
    page: 1
  };

  $scope.on_pagination = function() {
    ThesisCatalog.pagination($scope.query, function(items) {
      $scope.items = items;
    }).$promise;
  }

  $scope.search_items = function(search) {
    $scope.query.search = search;
    ThesisCatalog.search($scope.query, function(items) {
      $scope.items = items;
    }).$promise;
  }

  ThesisCatalog.size().$promise
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
