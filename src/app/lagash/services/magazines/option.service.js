export class MagazineOption {

  constructor() {
    'ngInject';
    this.months = [{
      key: 0,
      value: 'Enero'
    }, {
      key: 1,
      value: 'Febrero'
    }, {
      key: 2,
      value: 'Marzo'
    }, {
      key: 3,
      value: 'Abril'
    }, {
      key: 4,
      value: 'Mayo'
    }, {
      key: 5,
      value: 'Junio'
    }, {
      key: 6,
      value: 'Julio'
    }, {
      key: 7,
      value: 'Agosto'
    }, {
      key: 8,
      value: 'Septiembre'
    }, {
      key: 9,
      value: 'Octubre'
    }, {
      key: 10,
      value: 'Noviembre'
    }, {
      key: 11,
      value: 'Diciembre'
    }];

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
