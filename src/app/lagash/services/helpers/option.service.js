export class BasicOption {

  constructor() {
    'ngInject';
  }

  getYears() {
    var date = new Date();
    var counter = date.getFullYear();
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
