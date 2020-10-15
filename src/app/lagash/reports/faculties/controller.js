export class LagashReportsFacultiesController {

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
    Readers,
    Faculties
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
    this.Faculties = Faculties;

    this.item = null;
    this.faculties = null;
    this.faculty_id = null;
    this.loans = [];
    //this.items = ReportUtils.get_dates_range(15);
    this.items = ReportUtils.get_months_range(12);
    this.i18n = {
      BOOK: 'LIBRO',
      THESIS: 'TESIS',
      MAGAZINE: 'REVISTAR',
      NEWSPAPER: 'PERIODICO'
    };
    
    this.load_faculties();
  }

  load_faculties() {
    this.Faculties.query({}).$promise
    .then((res) => {
      this.faculties = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  search_faculties_load() {
    if (!this.faculty_id) {
      this.WToast.show('Tienes que seleccionar una facultad');
    }
    this.LoansReport.faculties({
      start_date: this.item.start.toDate(),
      end_date: this.item.end.toDate(),
      faculty_id: this.faculty_id
    }).$promise
    .then((res) => {
      res.forEach((item) => {
        this.find_material(item);
        this.find_reader(item);
        this.find_ejemplar(item);
      });
      this.loans = res;
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }

  go_to_item(item) {
    this.item = item;
    this.loans = [];
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
