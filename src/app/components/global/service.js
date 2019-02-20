export class Global {

  constructor(Store) {
    'ngInject';
    this.Store = Store;
    // SERVICE PATH
    this.PATH = 'http://bibliotecaserver.uab.edu.bo';
    // this.PATH = 'http://localhost:5570';
    this.user = null;
    this.socket = false;
  }

  start() {
    console.info('Starts the application!!');
    this.user = this.Store.load('user');
    console.log(this);
  }
}
