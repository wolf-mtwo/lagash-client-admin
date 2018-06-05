export class BasicOption {

  constructor(UUID) {
    'ngInject';
    this.UUID = UUID;
    this.EMPTY = 'NO EXISTE';
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
      key: 'rustico',
      value: 'Rustico'
    }, {
      key: 'empastado',
      value: 'Empastado'
    }, {
      key: 'anillado',
      value: 'Anillado'
    }, {
      key: 'otros',
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
  }

  getYears() {
    var date = new Date();
    var counter = date.getFullYear();
    counter -= 20;
    var result = [];
    for (var i = 0; i < 21; i++) {
      result.push({
        key: counter,
        value: counter
      });
      counter++;
    }
    return result;
  }

  get_year() {
    var date = new Date();
    return date.getFullYear();
  }

  get_code() {
    return [
      'ZZZ',
      this.UUID.next().substring(0, 3),
      this.UUID.next().substring(0, 3)
    ].join('.');
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
}
