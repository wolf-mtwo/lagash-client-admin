export class Global {

  constructor(Store) {
    'ngInject';
    // SERVICE PATH
    this.PATH = 'http://localhost:5570';
    this.user = null;
    this.socket = false;
  }

  start() {
    console.info('Starts the application!!');
    this.user = Store.load('user');
    console.log(this);
  }
}
