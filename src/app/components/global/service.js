export class Global {

  constructor($log, Store) {
    'ngInject';
    this.$log = $log;
    this.Store = Store;
    // SERVICE PATH
    // this.PATH = 'http://bibliotecaserver.uab.edu.bo';
    this.PATH = 'http://localhost:5570';
    this.user = null;
    this.socket = false;
  }

  start() {
    this.$log.info('Starts the application!!');
    this.user = this.Store.load('user');
    this.$log.log(this);
  }
}
