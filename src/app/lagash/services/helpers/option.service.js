export class BasicOption {

  constructor(UUID) {
    'ngInject';
    this.UUID = UUID;
    this.EMPTY = 'NO EXISTE';

    this.states = [{
      value: 'GUARDADO',
      key: 'STORED'
    }, {
      value: 'RESERVADO',
      key: 'BOOKED'
    }, {
      value: 'PRESTADO',
      key: 'BORROWED'
    }, {
      value: 'DEVUELTO',
      key: 'RESTORED'
    }];
    this.states_special = [];
    this.states_special['STORED'] = this.states[0];
    this.states_special['BOOKED'] = this.states[1];
    this.states_special['BORROWED'] = this.states[2];
    this.states_special['RESTORED'] = this.states[3];

    this.types = [{
      key: 'volumen',
      value: 'Volumen'
    }, {
      key: 'tomo',
      value: 'Tomo'
    }, {
      key: 'otros',
      value: 'Otros'
    }];

    this.covers = [{
      key: 'rustic',
      value: 'Rústico'
    }, {
      key: 'empastado',
      value: 'Empastado'
    }, {
      key: 'ringed',
      value: 'Anillado'
    }, {
      key: 'others',
      value: 'Otros'
    }];

    this.illustrations = [{
      key: 'cuadros',
      value: 'Cuadros'
    }, {
      key: 'fotos',
      value: 'Fotos'
    }, {
      key: 'tablas',
      value: 'Tablas'
    }, {
      key: 'figuras',
      value: 'Figuras'
    }, {
      key: 'otros',
      value: 'Otros'
    }];

    this.brings = [{
      key: 'cd',
      value: 'CD'
    }, {
      key: 'indice',
      value: 'Indice'
    }, {
      key: 'bibliografia',
      value: 'Bibliografía'
    }, {
      key: 'biografia',
      value: 'Biografía'
    }, {
      key: 'otros',
      value: 'Otros'
    }];

    this.days = [{
      key: 1,
      value: '1'
    }, {
      key: 2,
      value: '2'
    }, {
      key: 3,
      value: '3'
    }, {
      key: 4,
      value: '4'
    }, {
      key: 5,
      value: '5'
    }, {
      key: 6,
      value: '6'
    }, {
      key: 7,
      value: '7'
    }, {
      key: 8,
      value: '8'
    }, {
      key: 9,
      value: '9'
    }, {
      key: 10,
      value: '10'
    }, {
      key: 11,
      value: '11'
    }, {
      key: 12,
      value: '12'
    }, {
      key: 13,
      value: '13'
    }, {
      key: 14,
      value: '14'
    }, {
      key: 15,
      value: '15'
    }, {
      key: 16,
      value: '16'
    }, {
      key: 17,
      value: '17'
    }, {
      key: 18,
      value: '18'
    }, {
      key: 19,
      value: '19'
    }, {
      key: 20,
      value: '20'
    }, {
      key: 21,
      value: '21'
    }, {
      key: 22,
      value: '22'
    }, {
      key: 23,
      value: '23'
    }, {
      key: 24,
      value: '24'
    }, {
      key: 25,
      value: '25'
    }, {
      key: 26,
      value: '26'
    }, {
      key: 27,
      value: '27'
    }, {
      key: 28,
      value: '28'
    }, {
      key: 29,
      value: '29'
    }, {
      key: 30,
      value: '30'
    }, {
      key: 31,
      value: '31'
    }];
    this.months = [{
      key: 1,
      value: 'Enero'
    }, {
      key: 2,
      value: 'Febrero'
    }, {
      key: 3,
      value: 'Marzo'
    }, {
      key: 4,
      value: 'Abril'
    }, {
      key: 5,
      value: 'Mayo'
    }, {
      key: 6,
      value: 'Junio'
    }, {
      key: 7,
      value: 'Julio'
    }, {
      key: 8,
      value: 'Agosto'
    }, {
      key: 9,
      value: 'Septiembre'
    }, {
      key: 10,
      value: 'Octubre'
    }, {
      key: 11,
      value: 'Noviembre'
    }, {
      key: 12,
      value: 'Diciembre'
    }];
  }

  getYears() {
    var date = new Date();
    var year = date.getFullYear();
    var result = [];
    for (var i = 1950; i <= year; i++) {
      result.push({
        key: i,
        value: i
      });
    }
    return result;
  }

  get_year() {
    var date = new Date();
    return date.getFullYear();
  }

  get_code_material() {
    return [
      'WWW',
      this.UUID.next().substring(0, 3),
      this.UUID.next().substring(0, 3)
    ].join('.');
  }

  get_code_author() {
    return [
      'W',
      this.UUID.next().substring(0, 4)
    ].join('');
  }

  find_illustration(item) {
    var result = null;
    this.illustrations.forEach((illustration) => {
        if (illustration.key == item) {
          result = illustration.value;
        }
    });
    return result;
  }

  find_bring(item) {
    var result = null;
    this.brings.forEach((bring) => {
        if (bring.key == item) {
          result = bring.value;
        }
    });
    return result;
  }

  find_covers(item) {
    var result = null;
    this.covers.forEach((bring) => {
        if (bring.key == item) {
          result = bring.value;
        }
    });
    return result;
  }

  get_tags(tags) {
      var regex = /\[.*?\]/g;
      var match;
      var items = [];
      while ((match = regex.exec(tags)) !== null) {
          items.push(match[0]);
      }
      return items;
  }

  get_state(date) {
    var date_state = new Date(date);
    var day_state = date_state.getDate();
    var month_state = date_state.getMonth();
    var year_state = date_state.getFullYear();
    var date = new Date();
    var day_warn = date.getDate() - 1;
    var day_danger = date.getDate() - 2;
    var month = date.getMonth();
    var year = date.getFullYear();
    if (day_state === day_warn && month_state === month && year_state === year) {
      return '#f9f97a9c';
    }
    if (day_state <= day_danger && month_state <= month && year_state <= year) {
      return '#ff6d6dba';
    }
    // .lagash-report-warning
    // .lagash-report-danger
  }
}
