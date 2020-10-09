export class LagashBookingHistoryController {

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
      Readers,
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
      this.Readers = Readers;
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
      this.states = this.BasicOption.states_special;
      this.total = size.total;
      this.query = {
        search: '',
        limit: 50,
        page: 1
      };

      var self = this;
      self.on_pagination = function() {
        self.model.search(self.query, function(items) {
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
      var config = this.config[item.material_type];
      var data = {
        ejemplar_id: item.ejemplar_id
      };
      data[config.param] = item.material_id;
      var url = this.$state.href(config.route, data);
      window.open(url, '_blank');
    }

    loan(item, state) {
      this.model.loan(null, {
        _id: item._id,
        material_type: item.material_type,
        material_id: item.material_id,
        ejemplar_id: item.ejemplar_id,
        is_home: item.is_home,
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
        this.find_reader(item);
      });
    }

    find_reader(item) {
      this.Readers.get({
        _id: item.reader_id
      }).$promise
      .then((res) => {
        item.reader = res;
      })
      .catch((err) => {
        this.WError.request(err);
      });
    }

    find_data(item) {
      this[item.material_type].get({
        _id: item.material_id
      }).$promise
      .then((res) => {
        item.data = res;
      })
      .catch((err) => {
        this.WError.request(err);
      });
    }

    openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }
  }
