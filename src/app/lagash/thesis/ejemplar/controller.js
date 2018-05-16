export class LagashThesisEjemplarController {

  constructor($state, WError, WToast, Thesis, UUID, ThesisEjemplares, thesis, ejemplar) {
    'ngInject';
    this.$state = $state;
    this.Thesis = Thesis;
    this.WError = WError;
    this.WToast = WToast;
    this.ThesisEjemplares = ThesisEjemplares;
    this.item = thesis;
    this.ejemplar = ejemplar;

    this.states = [{
      value: 'Guardado',
      key: 'STORED'
    }, {
      value: 'Reservado',
      key: 'BOOKED'
    }, {
      value: 'Prestado',
      key: 'BORROWED'
    }];
  }

  save_ejemplar(ejemplar) {
    this.ThesisEjemplares.update({
      _id: ejemplar._id
    }, ejemplar)
    .$promise
    .then((response) => {
      console.log(response);
      // response.state = this.states[response.state].key;
      this.WToast.show('El ejemplar se actualizo correctamente');
    })
    .catch((err) => {
      this.WError.request(err);
    });
  }
}
