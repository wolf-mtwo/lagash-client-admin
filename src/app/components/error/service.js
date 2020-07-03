export class WError {

  constructor($mdToast, $log) {
    'ngInject';
    this.$mdToast = $mdToast;
    this.$log = $log;
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

  request(res) {
    var msg;
    if (res.status === -1) {
      msg = 'ERROR: ' + 'CONECCION RECHAZADA';
      this.displayError(msg);
      return;
    }
    if (res.status === 408) {
      msg = 'ERROR: ' + res.data;
      this.displayError(msg);
      return;
    }
    if (res.data) {
      msg = 'ERROR: ' + res.data.message;
      this.displayError(msg);
      return;
    } else {
      this.$log.error('NOT HANDLED ERROR:', res);
      return;
    }
  }

  display(err) {
    var msg = "ERROR: " + err;
    this.displayError(msg);
  }
}
