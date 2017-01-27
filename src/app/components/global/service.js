export class Global {

  constructor() {
    this._service = {
      PATH: PATH,
      user: null,
      socket: false,
      start: start
    };
  }

  start() {
    console.info('Starts the application!!');
   _service.user = Store.load('user');
    console.log(this);
  }
}
