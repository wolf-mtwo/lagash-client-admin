export class BookOption {

  constructor() {
    'ngInject';
    this.types = [{
      key: 'otros',
      value: 'Otros'
    }, {
      key: 'volumen',
      value: 'Volumen'
    }, {
      key: 'tomo',
      value: 'Tomo'
    }];

    this.covers = [{
      key: 'otros',
      value: 'Otros'
    }, {
      key: 'rustico',
      value: 'Rustico'
    }, {
      key: 'empastado',
      value: 'Empastado'
    }, {
      key: 'anillado',
      value: 'Anillado'
    }];

    this.illustrations = [{
      key: 'otros',
      value: 'Otros'
    }, {
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
    }];

    this.brings = [{
      key: 'otros',
      value: 'Otros'
    }, {
      key: 'cd',
      value: 'CD'
    }];
  }

  getYears() {
    var date = new Date();
    var counter = date.getFullYear();
    // this.item.year = counter;
    counter -= 5;
    var result = [];
    for (var i = 0; i < 10; i++) {
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
}
