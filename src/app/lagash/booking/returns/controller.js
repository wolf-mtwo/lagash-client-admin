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
    model,
    // config,
    // model
  ) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WToast = WToast;
    this.BasicOption = BasicOption;
    // this.config = config;
    this.model = model;
    // this.model = model;
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
      NEWSPAPER: 'PERIODICO',
      CREATED: 'NUEVO',
      LOAD: 'PRESTADO',
      RETURNS: 'DEVUELTO'
    }

    this.booking = [];
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
    // this.model.next().$promise
    // .then((res) => {
    //   if (!res.inventory) {
    //     this.WToast.show('Aun no existe ejemplares registrados');
    //     return;
    //   }
    //   this.select.start = res.inventory;
    //   this.select.end = res.inventory - 200 > 0 ? res.inventory - 200 : 0 ;
    // })
    // .catch((err) => {
    //   this.WError.request(err);
    // });

    var self = this;
    self.on_pagination = function() {
      self.model.search(self.query, function(items) {
        self.items = items;
        self.populate(items);
      }).$promise;
    };
    self.on_pagination();
  }

  // search() {
  //   this.model.select(this.select).$promise
  //   .then((res) => {
  //     this.items = res;
  //     this.populate(res);
  //   })
  //   .catch((err) => {
  //     this.WError.request(err);
  //   });
  // }

  search_ejemplares() {
    this.on_pagination();
  }

  // select_item(item) {
  //   var data = {};
  //   data[this.config.param] = item.data_id;
  //   var url = this.$state.href(this.config.route, data);
  //   window.open(url, '_blank');
  // }

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
}
