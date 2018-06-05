export class LagashBooksListController {

  constructor($state, $mdDialog, WError, WToast, Books, size, UUID, BasicOption) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Books = Books;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;

    this.books = [];
    this.total = size.total;
    this.query = {
      search: '',
      limit: 25,
      page: 1
    };
    var self = this;
    self.on_pagination = function() {
      Books.search(self.query, function(items) {
        self.books = items;
      }).$promise;
    }
    self.on_pagination();
  }

  search_books() {
    this.on_pagination();
  }

  select_book(item) {
    this.$state.go('lagash.books.list.preview', {
      book_id: item._id
    });
  }

  change_state(item) {
    this.Books.update({
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

  create_book(title) {
    var data = {
      _id: this.UUID.next(),
      code: this.BasicOption.get_code(),
      enabled: false,
      tags: null,
      type: null,
      cover: null,
      length: 0,
      width: 0,
      pages: 0,
      price: 0,
      illustrations: null,
      brings: null,
      year: this.BasicOption.get_year(),
      title: title || 'SIN NOMBRE',
      isbn: null
    };
    this.Books.save(data).$promise
    .then((res) => {
      this.books.unshift(res);
      this.select_book(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  show_book_create_dialog(ev) {
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
      templateUrl: 'app/lagash/books/list/create.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
         item: null
      }
    })
    .then(function(answer) {
      self.create_book(answer);
    }, function() {
      console.info('You cancelled the dialog.');
    });
  }
}
