export class LagashReportsSearchController {

  constructor(
    $state,
    $mdDialog,
    WError,
    WToast,
    Books,
    Thesis,
    Magazines,
    Newspapers,
    SearchReport,
    ReportUtils,
    Readers
  ) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WError = WError;
    this.WToast = WToast;
    this.BOOK = Books;
    this.THESIS = Thesis;
    this.MAGAZINE = Magazines;
    this.NEWSPAPER = Newspapers;
    this.SearchReport = SearchReport;
    this.Readers = Readers;

    this.search = '';
    this.item = null;
    this.item_menu = 'search';
    this.items = ReportUtils.get_dates_range(15);
    this.i18n = {
      BOOK: 'LIBRO',
      THESIS: 'TESIS',
      MAGAZINE: 'REVISTAR',
      NEWSPAPER: 'PERIODICO'
    };
    this.load_report();
  }

  load_report() {
    this.items.forEach((item) => {
      this.SearchReport.total({
        start_date: item.start,
        end_date: item.end,
        search: this.search
      }).$promise
      .then((res) => {
        item.state = true;
        item.total = res.length;
        item.search = res.filter(o => o.search !== '');
        item.navigation = res.filter(o => o.search === '');
      })
      .catch((err) => {
        this.WError.request(err);
      });
    });
  }

  get_summary(item) {
    if (item.state) {
      return [
        'Real: ' + item.search.length,
        'Navigation: ' + item.navigation.length,
        'Total: ' + item.total,
      ].join(' ');
    }
    return 'Actualizando...';
  }

  go_to_item(item) {
    this.item_menu = 'search';
    this.item = item;
    item.search.forEach((item) => {
      this.find_material(item);
      this.find_reader(item);
    });
    item.navigation.forEach((item) => {
      this.find_material(item);
      this.find_reader(item);
    });
  }

  clear_item() {
    this.item = null;
  }

  change_item_menu(type) {
    this.item_menu = type;
  }

  get_list() {
    return this.item[this.item_menu];
  }

  find_reader(item) {
    if (!item.reader_id) {
      return;
    }
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

  find_material(item) {
    if (!item.material_id) {
      return;
    }
    this[item.material_type].get({
      _id: item.material_id
    }).$promise
    .then((res) => {
      item.material = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
