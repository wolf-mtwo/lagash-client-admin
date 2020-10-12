export class LagashReportsLoansController {

  constructor(
    $state,
    $mdDialog,
    WError,
    WToast,
    moment,
    Books,
    Thesis,
    Magazines,
    Newspapers,
    BooksEjemplares,
    ThesisEjemplares,
    MagazinesEjemplares,
    NewspapersEjemplares,
    LoansReport,
    ReportUtils,
    Readers
  ) {
    'ngInject';
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.WError = WError;
    this.moment = moment;
    this.WToast = WToast;
    this.BOOK = {
      model: Books,
      ejemplar: BooksEjemplares
    };
    this.THESIS = {
      model: Thesis,
      ejemplar: ThesisEjemplares
    };
    this.MAGAZINE = {
      model: Magazines,
      ejemplar: MagazinesEjemplares
    };
    this.NEWSPAPER = {
      model: Newspapers,
      ejemplar: NewspapersEjemplares
    };

    this.LoansReport = LoansReport;
    this.Readers = Readers;

    this.search = '';
    this.item = null;
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
      this.LoansReport.daily({
        start_date: item.start,
        end_date: item.end,
        search: this.search
      }).$promise
      .then((res) => {
        item.state = true;
        item.loans = res;
      })
      .catch((err) => {
        this.WError.request(err);
      });
    });
  }

  get_summary(item) {
    if (item.state) {
      return [
        'Total: ' + item.loans.length,
      ].join(' ');
    }
    return 'Actualizando...';
  }

  go_to_item(item) {
    this.item = item;
    item.loans.forEach((item) => {
      this.find_material(item);
      this.find_reader(item);
      this.find_ejemplar(item);
    });
  }

  clear_item() {
    this.item = null;
  }

  change_item_menu(type) {
    this.item_menu = type;
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
    this[item.material_type].model.get({
      _id: item.material_id
    }).$promise
    .then((res) => {
      item.material = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  find_ejemplar(item) {
    if (!item.ejemplar_id) {
      return;
    }
    this[item.material_type].ejemplar.get({
      _id: item.ejemplar_id
    }).$promise
    .then((res) => {
      item.ejemplar = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  parse_ejemplar_information(ejemplar) {
    return [
      'Inventario: ' + ejemplar.inventory,
      'Ejemplar: ' + ejemplar.order
    ].join(' ');
  }

  parse_loan_time(item) {
    return this.moment(this.moment(item.start_date)).from(moment(item.end_date));
  }
}
