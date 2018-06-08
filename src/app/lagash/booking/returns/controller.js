export class LagashBookingReturnsController {

  constructor(
    $state,
    $mdDialog,
    WError,
    WToast,
    BooksEjemplares,
    UUID,
    BasicOption,
    Books,
    Thesis,
    Magazines,
    Newspapers,
    size,
    model
  ) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.BasicOption = BasicOption;
    this.model = model;
    this.UUID = UUID;
    this.WError = WError;
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
    this.config = {
      BOOK: {route: 'lagash.books.list.ejemplar', param: 'book_id'},
      THESIS: {route: 'lagash.thesis.list.ejemplar', param: 'thesis_id'},
      MAGAZINE: {route: 'lagash.magazines.list.ejemplar', param: 'magazine_id'},
      NEWSPAPER: {route: 'lagash.newspapers.list.ejemplar', param: 'newspaper_id'}
    };

    this.booking = [];
    this.states = this.BasicOption.states;
    this.total = size.total;
    this.query = {
      search: '',
      limit: 50,
      page: 1
    };

    var self = this;
    self.on_pagination = function() {
      self.model.borrowed_list(self.query, function(items) {
        self.items = items;
        self.populate(items);
      }).$promise;
    };
    self.on_pagination();
  }

  search_ejemplares() {
    this.on_pagination();
  }

  select_item(item) {
    var config = this.config[item.type];
    var data = {
      ejemplar_id: item.ejemplar_id
    };
    data[config.param] = item.data_id;
    var url = this.$state.href(config.route, data);
    window.open(url, '_blank');
  }

  loan(item, state) {
    this.model.loan(null, {
      _id: item._id,
      type: item.type,
      data_id: item.data_id,
      ejemplar_id: item.ejemplar_id,
      state: state
    }).$promise
    .then((res) => {
      item.state = res.state;
    })
    .catch((err) => {
      this.WError.request(err);
    });
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
      item.data = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  delete_loan(item, index) {
    this.model.remove({
      _id: item._id
    }, item).$promise
    .then((response) => {
      this.items.splice(index, 1);
      this.WToast.show('Se elimino la reservación');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }
}
