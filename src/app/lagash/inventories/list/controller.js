export class LagashInventoriesListController {

  constructor(
    $state,
    $mdDialog,
    WError,
    WToast,
    Ejemplares,
    size,
    UUID,
    BasicOption,
    Books,
    Thesis,
    Magazines,
    Newspapers
  ) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.Ejemplares = Ejemplares;
    this.BasicOption = BasicOption;
    this.UUID = UUID;
    this.WError = WError;
    this.Books = Books;
    this.Thesis = Thesis;
    this.Magazines = Magazines;
    this.Newspapers = Newspapers;
    this.BOOK = Books;
    this.THESIS = Thesis;
    this.MAGAZINE = Magazines;
    this.NEWSPAPER = Newspapers;
    this.i18n = {
      BOOK: 'LIBRO',
      THESIS: 'TESIS',
      MAGAZINE: 'REVISTAR',
      NEWSPAPER: 'PERIODICO'
    }

    this.inventories = [];
    this.select = {
      start: 0,
      end: 0
    }
    this.total = size.total;
    this.query = {
      search: '',
      limit: 50,
      page: 1
    };
    this.Ejemplares.next().$promise
    .then((res) => {
      if (!res.inventory) {
        this.WToast.show('Aun no existe ejemplares registrados');
        return;
      }
      this.select.start = res.inventory;
      this.select.end = res.inventory - 200 > 0 ? res.inventory - 200 : 0 ;
    })
    .catch((err) => {
      this.WError.request(err);
    });

    var self = this;
    self.on_pagination = function() {
      self.Ejemplares.search(self.query, function(items) {
        self.items = items;
        self.populate(items);
      }).$promise;
    };
    self.on_pagination();
  }

  search() {
    this.Ejemplares.select(this.select).$promise
    .then((res) => {
      this.items = res;
      this.populate(res);
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  search_ejemplares() {
    this.on_pagination();
  }

  select_item(item) {
    var url = null;
    switch (item.type) {
      case 'BOOK':
        url = this.$state.href('lagash.books.list.preview', {
          book_id: item.data_id,
        });
        break;
      case 'THESIS':
        url = this.$state.href('lagash.thesis.list.preview', {
          thesis_id: item.data_id,
        });
        break;
      case 'MAGAZINE':
        url = this.$state.href('lagash.magazines.list.preview', {
          magazine_id: item.data_id,
        });
        break;
      case 'NEWSPAPER':
        url = this.$state.href('lagash.newspapers.list.preview', {
          newspaper_id: item.data_id,
        });
        break;
      default:
        throw new Error('type in undefined');
    }

    window.open(url, '_blank');
  }

  populate(items) {
    items.forEach((item) => {
      this.find_data(item);
    })
  }

  find_data(item) {
    this[item.type].get({
      _id: item.data_id
    }).$promise
    .then((res) => {
      res.type = this.i18n[item.type]
      item.data = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
