export class CardType {

  constructor() {
    'ngInject';
  }

  get() {
    return [{
      key: 'student',
      value: 'Carnet de estudiante'
    }, {
      key: 'ci',
      value: 'Cedula de indentidad'
    }];
  }
}
