export class WError {

  constructor($mdToast) {
    'ngInject';
    this.$mdToast = $mdToast;
  }

  displayError(msg) {
    if (!msg) {
      throw new Error('msg is not defined');
    }
    this.$mdToast.show(
      this.$mdToast.simple(msg)
      .content(msg)
      .position('top right')
      .hideDelay(3000)
    );
  }

  request(response) {
    var msg;
    if (response.status === -1) {
      msg = 'ERROR: ' + 'CONECCION RECHAZADA';
      this.displayError(msg);
      return;
    }
    if (response.status === 408) {
      msg = 'ERROR: ' + response.data;
      this.displayError(msg);
      return;
    }
    if (response.data) {
      msg = 'ERROR: ' + response.data.message;
      this.displayError(msg);
      return;
    } else {
      console.error('NOT HANDLED ERROR:', response);
      return;
    }
  }

  display(error) {
    var msg = "ERROR: " + error;
    this.displayError(msg);
  }
}
