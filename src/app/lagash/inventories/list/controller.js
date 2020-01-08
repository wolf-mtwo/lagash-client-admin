export class LagashInventoriesListController {

  constructor(
    $state,
    $mdDialog,
    WError,
    WToast,
    BooksEjemplares,
    size,
    UUID,
    BasicOption,
    Books,
    Thesis,
    Magazines,
    Newspapers,
    config,
    model,
    model_ejemplar
  ) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.BasicOption = BasicOption;
    this.config = config;
    this.model = model;
    this.model_ejemplar = model_ejemplar;
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
    };

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
    this.model_ejemplar.next().$promise
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
      self.model_ejemplar.search(self.query, function(items) {
        self.items = items;
        self.populate(items);
      }).$promise;
    };
    self.on_pagination();
  };

  search() {
    this.model_ejemplar.select(this.select).$promise
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
    var data = {};
    data[this.config.param] = item.material_id;
    var url = this.$state.href(this.config.route, data);
    window.open(url, '_blank');
  }

  populate(items) {
    items.forEach((item) => {
      this.find_data(item);
    })
  }

  find_data(item) {
    this.model.get({
      _id: item.material_id
    }).$promise
    .then((res) => {
      item.data = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
