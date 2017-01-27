export class WError {

  constructor($mdToast) {
  }

  displayError(msg) {
    if (!msg) {
      throw new Error('msg is not defined');
    }
    $mdToast.show(
      $mdToast.simple(msg)
      .content(msg)
      .position('bottom left')
      .hideDelay(3000)
    );
  }

  request(response) {
    var msg;
    if (response.status === -1) {
      msg = 'ERROR: ' + 'CONECCION RECHAZADA';
      displayError(msg);
      return;
    }
    if (response.status === 408) {
      msg = 'ERROR: ' + response.data;
      displayError(msg);
      return;
    }
    if (response.data) {
      msg = 'ERROR: ' + response.data.message;
      displayError(msg);
      return;
    } else {
      console.log('NOT HANDLED ERROR:', response);
      return;
    }
  }

  display(error) {
    var msg = "ERROR: " + error;
    displayError(msg);
  }
}
